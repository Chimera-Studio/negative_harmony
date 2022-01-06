import { StyleSheet, Platform } from "react-native";
import colors from "./colors";

const chords = StyleSheet.create({
  soundButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  soundButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: colors.blue,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  soundButtonText: {
    textAlign: "center",
    fontFamily: "NegativeHarmonyBold",
    marginLeft: 5,
    color: colors.white,
  },
});

export default chords;
