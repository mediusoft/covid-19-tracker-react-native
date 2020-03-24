import i18next from "i18next";
import { I18nManager as RNI18nManager } from "react-native";
import * as config from "./config";
import languageDetector, { getCurrentLocale } from "./language-detector";
import translationLoader from "./translation-loader";

const i18n = {
  init: async language => {
    await i18next
      .use(languageDetector(language || getCurrentLocale))
      .use(translationLoader)
      .init(
        {
          fallbackLng: config.fallback,
          ns: config.namespaces,
          defaultNS: config.defaultNamespace,
          interpolation: {
            escapeValue: false
          }
        },
        error => {
          if (error) {
            throw error;
          }
        }
      );
  },
  t: (key, options) => {
    return i18next.t(key, options);
  },
  get locale() {
    return i18next.language;
  },
  get localeName() {
    const locale = config.supportedLocales[i18next.language];

    if (locale) {
      return locale.name;
    }

    return config.supportedLocales[config.fallback].name;
  },
  get dir() {
    return i18next.dir().toUpperCase();
  },
  get isRTL() {
    return RNI18nManager.isRTL;
  },
  select(map) {
    const key = this.isRTL ? "rtl" : "ltr";

    return map[key];
  }
};

export const { t } = i18n;

export default i18n;
