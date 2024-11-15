/// <reference types="cordova" />
/// <reference types="facebook-js-sdk/" />

export {};

declare global {
  interface Window {
    cordova: Cordova;
    APP_ID: string;
    FACEBOOK_BROWSER_SDK_VERSION: string;
    FB: facebook.FacebookStatic
  }
}
