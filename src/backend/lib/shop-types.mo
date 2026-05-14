import Types "../types/common";

/// Domain logic helpers for shop-type engine field construction.
/// Stubs — implemented by the develop agent.
module {

  /// Returns a blank ElectricalFields record ready for UI hydration.
  public func defaultElectricalFields() : Types.ElectricalFields {
    {
      itemCategory  = "";
      brand         = "";
      model         = "";
      ampereRating  = "";
      voltageRating = "";
      wattage       = "";
      wireGauge     = "";
      lengthUnit    = "Piece";
      color         = "";
      isiCertified  = false;
      batchNumber   = "";
      expiryDate    = null;
    };
  };

  /// Returns a blank expanded MobileFields record ready for UI hydration.
  public func defaultMobileFields() : Types.MobileFields {
    {
      mobileCategory = "Mobile";
      brand          = "";
      model          = "";
      imei           = "";
      color          = "";
      storage        = "";
      ram            = "";
      processor      = "";
      displaySize    = "";
      accessoryType  = "";
      compatibility  = "";
      warrantyMonths = 0;
      serialNumber   = "";
      expiryDate     = null;
    };
  };

  /// True when IMEI validation is required for the given mobile category string.
  public func imeiRequired(mobileCategory : Text) : Bool {
    mobileCategory == "Mobile";
  };

};
