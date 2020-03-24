import { Dimensions, StyleSheet } from "react-native";
import * as theme from "theme";

const { height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: "column"
  },
  rapih: {
    height: height / 3.7,
    marginLeft: theme.padding.left,
    marginRight: theme.padding.right,
    fontFamily: "poppins",
    fontSize: 18,
    backgroundColor: theme.colors.background_secondary
  },
  title: {
    fontSize: theme.size.large,
    color: theme.colors.white,
    fontFamily: "poppins-bold",
    opacity: 0.87,
    paddingLeft: theme.padding.left,
    paddingRight: theme.padding.right,
    marginTop: 25
  },
  localTitle: {
    fontSize: theme.size.large,
    color: theme.colors.white,
    fontFamily: "poppins-bold",
    opacity: 0.87,
    paddingLeft: theme.padding.left,
    paddingRight: theme.padding.right,
    marginTop: 30
  },
  language: {
    paddingRight: theme.padding.right
  },
  status: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: theme.padding.left,
    paddingRight: theme.padding.right,
    marginTop: 20
  },
  kartuConfirmed: {
    flex: 1,
    padding: 2,
    height: height / 4.5,
    backgroundColor: theme.colors.yellow,
    marginRight: 7,
    borderRadius: theme.sizes.radius
  },
  kartuRecovered: {
    flex: 1,
    padding: 2,
    height: height / 4.5,
    backgroundColor: theme.colors.green,
    marginRight: 7,
    borderRadius: theme.sizes.radius
  },
  kartuDeath: {
    flex: 1,
    padding: 2,
    height: height / 4.5,
    backgroundColor: theme.colors.red,
    marginRight: 7,
    borderRadius: theme.sizes.radius
  },
  kartuKet: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  labelCount: {
    color: theme.colors.white,
    fontSize: theme.size.sedang,
    textAlign: "center",
    fontFamily: "poppins-bold",
    marginTop: 10
  },
  labelDesc: {
    color: theme.colors.white,
    fontSize: theme.size.kecil,
    textAlign: "center",
    fontFamily: "poppins",
    marginTop: -5
  },
  icn: {
    width: 40,
    height: 40,
    marginTop: 10
  },
  btnRecovered: {
    backgroundColor: theme.colors.green,
    marginTop: 20,
    padding: 8,
    borderRadius: theme.sizes.radius
  },
  btnRecoveredText: {
    color: theme.colors.white,
    fontSize: theme.size.sedang,
    textAlign: "center",
    fontFamily: "poppins-bold"
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.background_secondary,
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  textConfirmedBold: {
    color: theme.colors.yellow,
    fontSize: 16,
    fontFamily: "poppins-bold"
  },
  textConfirmed: {
    color: theme.colors.yellow,
    fontSize: 12,
    fontFamily: "poppins",
    marginTop: -5
  },
  textRecoveredBold: {
    color: theme.colors.green,
    fontSize: 16,
    fontFamily: "poppins-bold"
  },
  textRecovered: {
    color: theme.colors.green,
    fontSize: 12,
    fontFamily: "poppins",
    marginTop: -5
  },
  textblueBold: {
    color: theme.colors.blue,
    fontSize: 16,
    fontFamily: "poppins-bold"
  },
  textblue: {
    color: theme.colors.blue,
    fontSize: 12,
    fontFamily: "poppins",
    marginTop: -5
  },
  textDeathBold: {
    color: theme.colors.red,
    fontSize: 16,
    fontFamily: "poppins-bold"
  },
  textDeath: {
    color: theme.colors.red,
    fontSize: 12,
    fontFamily: "poppins",
    marginTop: -5
  },
  textUpdatedBold: {
    color: theme.colors.white,
    marginBottom: 3,
    fontSize: 14,
    fontFamily: "poppins-bold"
  },
  textUpdated: {
    color: theme.colors.white,
    fontSize: 12,
    fontFamily: "poppins",
    marginTop: -5
  }
});
