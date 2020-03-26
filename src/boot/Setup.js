import { AppLoading, Notifications, Updates } from "expo";
import * as Font from "expo-font";
import i18n from "i18n";
import React, { Component } from "react";
import { I18nManager as RNI18nManager, Platform, UIManager, YellowBox } from "react-native";
// eslint-disable-next-line import/no-unresolved
import { enableScreens } from "react-native-screens";
import AppNavigator from "routes/AppNavigator";
import { getCurrrentCountryName } from "services/apiServices";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

console.disableYellowBox = true;

enableScreens();

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

YellowBox.ignoreWarnings(["ERROR_CODE_NO_FILL"]);

const initializeI18nAsync = async () => {
  await i18n.init();

  const RNDir = RNI18nManager.isRTL ? "RTL" : "LTR";

  // RN doesn't always correctly identify native locale direction, so we force it here.
  if (i18n.dir !== RNDir) {
    const isLocaleRTL = i18n.dir === "RTL";

    RNI18nManager.forceRTL(isLocaleRTL);

    // RN won't set the layout direction if we don't restart the app's JavaScript.
    Updates.reloadFromCache();
  }
};

const setupNotificationChannelsAsync = async () => {
  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("notifications", {
      name: "Notifications",
      sound: true,
      vibrate: true,
      badge: true,
      priority: "max"
    });
  }
};

const getCurrentCountry = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === "granted") {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      const countryName = await getCurrrentCountryName({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });

      if (countryName) {
        return countryName;
      }
    }
  }
  return null;
};

const cacheFonts = () => {
  return [
    Font.loadAsync({
      poppins: require("assets/fonts/Poppins-Regular.ttf"),
      "poppins-bold": require("assets/fonts/Poppins-Bold.ttf")
    })
  ];
};

export default class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      defaultCountry: "Azerbaijan"
    };
  }

  componentDidCatch(error) {
    console.warn(error);
  }

  _setUpDependenciesAsync = async () => {
    const defaultCountry = await getCurrentCountry();
    if (defaultCountry) {
      this.setState({ defaultCountry });
    }
    await Promise.all([...cacheFonts(), initializeI18nAsync(), setupNotificationChannelsAsync()]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleLoadingFinish = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete, skipLoadingScreen, defaultCountry } = this.state;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._setUpDependenciesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleLoadingFinish}
        />
      );
    }

    return <AppNavigator defaultCountry={defaultCountry} />;
  }
}
