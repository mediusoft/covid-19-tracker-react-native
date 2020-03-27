export const fallback = "az";

export const supportedLocales = {
  en: {
    name: "Eng",
    translationFileLoader: () => require("./lang/en.json"),
    momentLocaleLoader: () => Promise.resolve()
  },
  az: {
    name: "Aze",
    translationFileLoader: () => require("./lang/az.json"),
    momentLocaleLoader: () => Promise.resolve()
  },
  ru: {
    name: "Рус",
    translationFileLoader: () => require("./lang/ru.json"),
    momentLocaleLoader: () => Promise.resolve()
  },
  tr: {
    name: "Tür",
    translationFileLoader: () => require("./lang/tr.json"),
    momentLocaleLoader: () => Promise.resolve()
  }
};

export const defaultNamespace = "common";

export const namespaces = ["common", "home", "detail"];
