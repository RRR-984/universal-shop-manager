import RatesLib "../lib/jewelry-rates";
import RatesTypes "../types/jewelry-rates";
import Outcall   "mo:caffeineai-http-outcalls/outcall";

mixin (ratesState : RatesLib.State) {
  // Shared transform function required by http-outcalls extension.
  // Must be a query method so it can be passed as a callback to the IC HTTP outcall.
  public query func transformRatesResponse(
    input : Outcall.TransformationInput
  ) : async Outcall.TransformationOutput {
    Outcall.transform(input);
  };

  // Returns cached metal rates (gold + silver in PKR per gram).
  // Always returns something useful:
  //   - available=true with live/recent values if any fetch ever succeeded
  //   - available=false with hardcoded fallback values if no fetch ever succeeded
  public query func getMetalRates() : async RatesTypes.MetalRates {
    RatesLib.getMetalRates(ratesState);
  };

  // Triggers a live rate fetch — tries Coinbase first, goldprice.org as fallback.
  // Skips the HTTP call if cached rates are less than 1 hour old.
  // If both APIs fail but we have prior good rates, old rates are preserved.
  public shared func refreshMetalRates() : async () {
    await RatesLib.refreshMetalRates(ratesState, transformRatesResponse);
  };

  // Allows the user to manually override gold (24K) and silver rates (INR per gram).
  // Sets available=true so the override is shown immediately.
  // Does not update lastUpdated so auto-refresh can still run on next call.
  public shared func setMetalRatesManual(gold24kPerGram : Float, silverPerGram : Float) : async () {
    ratesState.gold24k   := gold24kPerGram;
    ratesState.silver    := silverPerGram;
    ratesState.available := true;
    // Do not update lastUpdated — this lets auto-refresh still trigger on next call
  };
};
