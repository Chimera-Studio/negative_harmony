import { StyleSheet, Platform } from "react-native";
import colors from "./colors";

const announcement_style = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: "NegativeHarmonyBold",
    fontSize: 24,
    marginBottom: 40,
    marginTop: 40,
    textAlign: "center",
  },

  text: {
    color: colors.black,
    fontFamily: "NegativeHarmonyRegular",
    fontSize: 16,
  },

  button: {
    backgroundColor: colors.blue,
    borderRadius: 30,
    marginBottom: 20,
    marginHorizontal: 40,
    marginTop: 60,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  buttonText: {
    color: colors.white,
    fontFamily: "NegativeHarmonyBold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default announcement_style;
