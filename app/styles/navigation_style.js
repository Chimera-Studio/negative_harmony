import { StyleSheet, Platform } from "react-native";
import colors from "./colors";

const navigation_style = StyleSheet.create({
  navigation: {
    alignItems: "center",
    flexDirection: "row",
    height: 40,
    justifyContent: "space-between",
    width: "100%",
  },

  switch: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 40,
    height: 30,
    justifyContent: "center",
    paddingVertical: 0,
    width: 70,
  },

  switchText: {
    color: colors.white,
    fontFamily: "NegativeHarmonyBold",
    fontSize: 12,
    textAlign: "center",
  },

  info: {
    width: 30,
    height: 30,
  },
});

export default navigation_style;
