import * as Localization from "expo-localization";
import { AsyncStorage } from "utils/AsyncStorage";

export const getCurrentLocale = callback => {
  // We will get back a string like "en-US". We
  // return a string like "en" to match our language
  // files.
  const defaultLocale = Localization.locale.split("-")[0];
  return callback(defaultLocale);
};

const callFallbackIfFunc = (fallback, callback) => {
  if (typeof fallback === "function") {
    return fallback(callback);
  }

  return callback(fallback);
};

export default fallback => ({
  type: "languageDetector",
  async: true,
  detect: callback => {
    try {
      AsyncStorage.getItem("@Settings/language").then(language => {
        if (language) {
          if (typeof fallback === "string" && language !== fallback) {
            callback(fallback);
          } else {
            callback(language);
          }
        } else {
          callFallbackIfFunc(fallback, callback);
        }
      });
    } catch (error) {
      callFallbackIfFunc(fallback, callback);
    }
  },
  init: () => {},
  cacheUserLanguage: lang => {
    try {
      AsyncStorage.setItem("@Settings/language", lang);
    } catch (error) {
      console.error(error);
    }
  }
});
