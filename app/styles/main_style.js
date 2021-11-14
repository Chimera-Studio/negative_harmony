import { StyleSheet, Platform } from "react-native";
import colors from "./colors";

const main_style = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginHorizontal: "5%",
    position: "relative",
    width: "90%",
  },

  safe: {
    flex: 1,
    position: "relative",
    width: "100%",
  },

  alert: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    display: "flex",
    elevation: 2,
    height: Platform.OS === "ios" && !Platform.isPad ? "18%" : "17%",
    justifyContent: "flex-end",
    left: "-5%",
    paddingBottom: 30,
    position: "absolute",
    top: Platform.OS === "ios" && !Platform.isPad ? 0 : "-5%",
    width: "110%",
    zIndex: 2,
  },

  alertText: {
    color: colors.black,
    fontFamily: "NegativeHarmonyBold",
    fontSize: 18,
    textAlign: "center",
  },

  ads: {
    alignItems: "center",
    bottom: Platform.OS === "ios" && !Platform.isPad ? "4.5%" : 0,
    display: "flex",
    height: "10%",
    justifyContent: "flex-end",
    position: "absolute",
    width: "100%",
  },
});

export default main_style;
