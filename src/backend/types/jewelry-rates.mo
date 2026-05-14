module {
  public type MetalRates = {
    gold24k     : Float;   // INR per gram — 24K pure gold
    gold22k     : Float;   // INR per gram — 22K gold (gold24k × 22/24), computed on read
    silver      : Float;   // INR per gram (XAG)
    lastUpdated : Int;     // nanosecond timestamp of last successful fetch
    available   : Bool;    // false if last fetch failed or no data yet
    isStale     : Bool;    // true if last fetch is >6 hours old or failed
  };
};
