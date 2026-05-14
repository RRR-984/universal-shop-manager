import Types  "../types/jewelry-rates";
import Time   "mo:core/Time";
import Nat    "mo:core/Nat";
import Debug  "mo:core/Debug";
import Outcall "mo:caffeineai-http-outcalls/outcall";

module {
  // ── State ────────────────────────────────────────────────────────────────────
  public type State = {
    var gold24k     : Float;  // INR per gram — 24K
    var silver      : Float;  // INR per gram
    var lastUpdated : Int;
    var available   : Bool;
  };

  // Hardcoded fallback rates (INR per gram, approximate as of 2025).
  // Gold 24K ~₹6,200/g, Silver ~₹75/g
  let FALLBACK_GOLD24K_INR_PER_GRAM : Float = 6_200.0;
  let FALLBACK_SILVER_INR_PER_GRAM  : Float = 75.0;

  // 22K gold = 24K × (22/24) ≈ 0.9167
  let KARAT_22_RATIO : Float = 0.9167;

  // 6-hour staleness threshold in nanoseconds (6 × 3,600,000,000,000)
  let staleThreshold : Int = 21_600_000_000_000;

  // Cache TTL: same as staleThreshold (6 hours)
  let cacheTTL : Int = 21_600_000_000_000;

  // Troy ounce to gram conversion
  let troyOzToGram : Float = 31.1035;

  public func newState() : State {
    {
      var gold24k     = FALLBACK_GOLD24K_INR_PER_GRAM;
      var silver      = FALLBACK_SILVER_INR_PER_GRAM;
      var lastUpdated = 0;
      var available   = false;   // false until first successful live fetch
    };
  };
  func hasValidRates(state : State) : Bool { state.lastUpdated > 0 };

  func isStaleNow(state : State) : Bool {
    if (not state.available) return true;
    if (state.lastUpdated == 0) return true;
    (Time.now() - state.lastUpdated) >= staleThreshold
  };

  // ── Query ─────────────────────────────────────────────────────────────────────
  public func getMetalRates(state : State) : Types.MetalRates {
    let gold22k = state.gold24k * KARAT_22_RATIO;
    {
      gold24k     = state.gold24k;
      gold22k     = gold22k;
      silver      = state.silver;
      lastUpdated = state.lastUpdated;
      available   = state.available or hasValidRates(state);
      isStale     = isStaleNow(state);
    };
  };

  // ── Refresh ───────────────────────────────────────────────────────────────────
  // Source priority:
  //   1. open.er-api.com/v6/latest/XAU  — XAU/INR exchange rate (free, no key)
  //   2. cdn.jsdelivr.net/@fawazahmed0/currency-api — XAU in INR (free, no key)
  //   3. Hardcoded INR fallback
  //
  // For silver: use XAG/INR from open.er-api.com/v6/latest/XAG
  // Both sources return 1 XAU or XAG = N INR, divide by 31.1035 to get per gram.
  //
  // Skips fetch if cache is fresh (< 6 hours old).
  public func refreshMetalRates(state : State, transform : Outcall.Transform) : async () {
    let now = Time.now();

    // Skip if cache is fresh
    if (hasValidRates(state) and (now - state.lastUpdated) < cacheTTL) {
      Debug.print("[JewelryRates] Cache still fresh, skipping refresh.");
      return;
    };

    Debug.print("[JewelryRates] Starting INR metal rate refresh...");

    // ── Try primary: open.er-api.com ─────────────────────────────────────────
    let erApiGoldUrl   = "https://open.er-api.com/v6/latest/XAU";
    let erApiSilverUrl = "https://open.er-api.com/v6/latest/XAG";

    let erGoldBody = try {
      Debug.print("[JewelryRates] Fetching XAU/INR from er-api: " # erApiGoldUrl);
      let body = await Outcall.httpGetRequest(erApiGoldUrl, [], transform);
      Debug.print("[JewelryRates] er-api gold response: " # body);
      ?body
    } catch (e) {
      Debug.print("[JewelryRates] er-api gold fetch failed: " # e.message());
      null
    };

    let erSilverBody = try {
      Debug.print("[JewelryRates] Fetching XAG/INR from er-api: " # erApiSilverUrl);
      let body = await Outcall.httpGetRequest(erApiSilverUrl, [], transform);
      Debug.print("[JewelryRates] er-api silver response: " # body);
      ?body
    } catch (e) {
      Debug.print("[JewelryRates] er-api silver fetch failed: " # e.message());
      null
    };

    switch (erGoldBody, erSilverBody) {
      case (?goldJson, ?silverJson) {
        let goldPerOz   = extractErApiRate(goldJson, "INR");
        let silverPerOz = extractErApiRate(silverJson, "INR");
        switch (goldPerOz, silverPerOz) {
          case (?gOz, ?sOz) {
            Debug.print("[JewelryRates] er-api parsed — XAU/INR: " # debug_show(gOz) # " XAG/INR: " # debug_show(sOz));
            state.gold24k     := gOz / troyOzToGram;
            state.silver      := sOz / troyOzToGram;
            state.lastUpdated := now;
            state.available   := true;
            Debug.print("[JewelryRates] Updated — gold24k/g: " # debug_show(state.gold24k) # " silver/g: " # debug_show(state.silver));
            return;
          };
          case _ {
            Debug.print("[JewelryRates] er-api parse failed — gold: " # debug_show(goldPerOz) # " silver: " # debug_show(silverPerOz));
          };
        };
      };
      case _ {
        Debug.print("[JewelryRates] er-api fetch incomplete — trying fawazahmed0 API.");
      };
    };

    // ── Try secondary: fawazahmed0 currency-api (XAU in INR) ────────────────
    // Response: {"date":"...","xau":{"inr":195000.0,...}}
    let fawazGoldUrl   = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json";
    let fawazSilverUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xag.json";

    let fawazGoldBody = try {
      Debug.print("[JewelryRates] Fetching XAU from fawazahmed0: " # fawazGoldUrl);
      let body = await Outcall.httpGetRequest(fawazGoldUrl, [], transform);
      Debug.print("[JewelryRates] fawazahmed0 gold response received.");
      ?body
    } catch (e) {
      Debug.print("[JewelryRates] fawazahmed0 gold fetch failed: " # e.message());
      null
    };

    let fawazSilverBody = try {
      Debug.print("[JewelryRates] Fetching XAG from fawazahmed0: " # fawazSilverUrl);
      let body = await Outcall.httpGetRequest(fawazSilverUrl, [], transform);
      Debug.print("[JewelryRates] fawazahmed0 silver response received.");
      ?body
    } catch (e) {
      Debug.print("[JewelryRates] fawazahmed0 silver fetch failed: " # e.message());
      null
    };

    switch (fawazGoldBody, fawazSilverBody) {
      case (?goldJson, ?silverJson) {
        // gold JSON: {"xau":{"inr":195000.0}} — field "inr" inside "xau" object
        let goldPerOz   = extractFawazRate(goldJson, "xau", "inr");
        let silverPerOz = extractFawazRate(silverJson, "xag", "inr");
        switch (goldPerOz, silverPerOz) {
          case (?gOz, ?sOz) {
            Debug.print("[JewelryRates] fawazahmed0 parsed — XAU/INR: " # debug_show(gOz) # " XAG/INR: " # debug_show(sOz));
            state.gold24k     := gOz / troyOzToGram;
            state.silver      := sOz / troyOzToGram;
            state.lastUpdated := now;
            state.available   := true;
            Debug.print("[JewelryRates] Updated from fawazahmed0 — gold24k/g: " # debug_show(state.gold24k) # " silver/g: " # debug_show(state.silver));
            return;
          };
          case _ {
            Debug.print("[JewelryRates] fawazahmed0 parse failed — gold: " # debug_show(goldPerOz) # " silver: " # debug_show(silverPerOz));
          };
        };
      };
      case _ {
        Debug.print("[JewelryRates] fawazahmed0 fetch incomplete — using hardcoded fallback.");
      };
    };

    // ── Both APIs failed ──────────────────────────────────────────────────────
    if (hasValidRates(state)) {
      state.available := false;
      Debug.print("[JewelryRates] Both APIs failed — keeping last known good rates (stale).");
    } else {
      state.gold24k   := FALLBACK_GOLD24K_INR_PER_GRAM;
      state.silver    := FALLBACK_SILVER_INR_PER_GRAM;
      state.available := false;
      Debug.print("[JewelryRates] Both APIs failed and no prior rates — using hardcoded INR fallback.");
    };
  };

  // ── JSON parsing: open.er-api.com ─────────────────────────────────────────────
  // Response: {"result":"success","rates":{"INR":195000.0,...}}
  // Strategy: find `"INR":` then read until next `,` or `}`
  func extractErApiRate(json : Text, currency : Text) : ?Float {
    let needle = "\"" # currency # "\":";
    let parts  = json.split(#text needle).toArray();
    if (parts.size() < 2) {
      Debug.print("[JewelryRates] extractErApiRate: '" # currency # "' not found");
      return null;
    };
    var numStr = takeUntilChar(parts[1], ',');
    numStr := takeUntilChar(numStr, '}');
    numStr := numStr.trim(#char ' ');
    if (numStr.size() == 0) return null;
    Debug.print("[JewelryRates] extractErApiRate '" # currency # "': parsing '" # numStr # "'");
    textToFloat(numStr)
  };

  // ── JSON parsing: fawazahmed0 currency-api ────────────────────────────────────
  // Response: {"date":"...","xau":{"inr":195000.0,...}}
  // Strategy: find `"inr":` (inside the metal object) then read until `,` or `}`
  func extractFawazRate(json : Text, _metal : Text, currency : Text) : ?Float {
    // The JSON has the currency inside the metal object.
    // We just search for `"inr":` anywhere — it's unique enough.
    extractErApiRate(json, currency)
  };
  // ── Helpers ───────────────────────────────────────────────────────────────────

  // Reads characters from `t` until the first occurrence of `stopChar`.
  func takeUntilChar(t : Text, stopChar : Char) : Text {
    var result = "";
    var stop   = false;
    for (c in t.toIter()) {
      if (not stop) {
        if (c == stopChar) {
          stop := true;
        } else {
          result := result # Text.fromChar(c);
        };
      };
    };
    result
  };

  // Parses a decimal string like "12345.67" or "12345" into a Float.
  // Returns null if the string is not a valid number.
  func textToFloat(t : Text) : ?Float {
    // Handle negative sign
    let (negative, digits) = if (t.size() > 0) {
      switch (t.toIter().next()) {
        case (?'-') { (true, t.trimStart(#char '-')) };
        case _      { (false, t) };
      };
    } else {
      return null;
    };

    let partsArr = digits.split(#char '.').toArray();
    if (partsArr.size() == 0 or partsArr[0].size() == 0) return null;

    let intPart : Float = switch (Nat.fromText(partsArr[0])) {
      case (?n) n.toFloat();
      case null {
        Debug.print("[JewelryRates] textToFloat: invalid integer part '" # partsArr[0] # "'");
        return null;
      };
    };

    let fracFloat : Float = if (partsArr.size() >= 2 and partsArr[1].size() > 0) {
      switch (Nat.fromText(partsArr[1])) {
        case (?frac) {
          var divisor : Float = 1.0;
          var i = 0;
          while (i < partsArr[1].size()) { divisor *= 10.0; i += 1 };
          frac.toFloat() / divisor;
        };
        case null 0.0;
      };
    } else { 0.0 };

    let result = intPart + fracFloat;
    ?(if (negative) -result else result);
  };
};
