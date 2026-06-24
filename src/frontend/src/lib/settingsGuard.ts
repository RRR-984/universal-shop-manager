/**
 * Module-level flag used to prevent the RootLayout route guard
 * from triggering a redirect while settings are being saved.
 *
 * Settings save calls setShopConfig() which causes Zustand state
 * updates → App.tsx re-renders → route guard re-evaluates.
 * During that window, if localStorage markers haven't been flushed
 * yet, setupAlreadyDone could briefly appear false and redirect.
 *
 * Setting this flag to true blocks ANY redirect in the route guard
 * for the duration of the save operation.
 */
export const settingsGuard = {
  isSavingSettings: false,
};
