import { StyleSheet } from "react-native";
import { isApple, isPad } from "../utils";
import colors from "./colors";

const info_style = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    marginTop: isApple && !isPad ? 0 : 10,
  },
  content: {
    width: "90%",
    height: "75%",
  },
  title: {
    color: colors.black,
    fontFamily: "NegativeHarmonyBold",
    textAlign: "center",
    fontSize: 22,
    marginTop: "10%",
    marginBottom: "5%",
  },
  subTitle: {
    color: colors.black,
    fontFamily: "NegativeHarmonyBold",
    textAlign: "left",
    fontSize: 16,
    marginVertical: 15,
  },
  contactTitle: {
    color: colors.black,
    fontFamily: "NegativeHarmonyBold",
    textAlign: "left",
    fontSize: 14,
    marginVertical: 15,
  },
  text: {
    color: colors.black,
    fontFamily: "NegativeHarmonyRegular",
    textAlign: "left",
    fontSize: 14,
  },
});

export default info_style;
