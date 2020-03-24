import * as config from "./config";

const translationLoader = {
  type: "backend",
  init: () => {},
  read(language, namespace, callback) {
    let resource;
    const error = null;

    try {
      resource = config.supportedLocales[language].translationFileLoader()[namespace];
    } catch (_error) {
      // error = _error;
    }

    callback(error, resource);
  }
};

export default translationLoader;
