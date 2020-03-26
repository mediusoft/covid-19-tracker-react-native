import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { t } from "i18n";

import * as theme from "theme";

class Splash extends React.Component {
  async componentDidMount() {
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate("Home");
    }
  }

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 1500)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.conSplash}>
          <Image source={require("assets/images/icon_512.png")} style={styles.icnErr} />
          <Text style={styles.title}>COVY</Text>
          <Text style={styles.subTitle}>{`<> with ♥ by Mediusoft`}</Text>
          <Text style={styles.subTitle}>{t("stayAtHome")}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  conSplash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -80
  },
  rapih: {
    marginLeft: theme.padding.left,
    marginRight: theme.padding.right,
    fontFamily: "poppins",
    fontSize: 18
  },
  title: {
    fontSize: theme.size.medium,
    color: theme.colors.white,
    fontFamily: "poppins-bold",
    opacity: 0.87,
    paddingLeft: theme.padding.left,
    paddingRight: theme.padding.right,
    marginTop: 25,
    marginBottom: 10,
    textAlign: "center"
  },
  subTitle: {
    fontSize: theme.size.small,
    color: theme.colors.white,
    fontFamily: "poppins",
    opacity: 0.87,
    paddingLeft: theme.padding.left,
    paddingRight: theme.padding.right,
    textAlign: "center"
  },
  icnErr: {
    width: 150,
    height: 150
  }
});

export default Splash;
