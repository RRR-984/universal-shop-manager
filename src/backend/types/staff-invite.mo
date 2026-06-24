import Principal "mo:core/Principal";

module {
  public type StaffInvite = {
    token    : Text;
    shopId   : Text;
    createdAt : Int;
    expiresAt : Int;
    used      : Bool;
    usedBy    : ?Principal;
  };

  public type StaffInviteView = {
    token     : Text;
    shopId    : Text;
    createdAt : Int;
    expiresAt : Int;
    used      : Bool;
    usedBy    : ?Principal;
  };
};
