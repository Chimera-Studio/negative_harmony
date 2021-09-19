import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import colors from "../config/colors";

function WhiteBG() {
  return <View style={styles.background} />;
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: "-5%",
    left: "-10%",
    right: 0,
    bottom: 0,
    width: "120%",
    height: "120%",
    backgroundColor: colors.white,
    flex: Platform.OS === "ios" && !Platform.isPad ? null : 1,
  },
});

export default WhiteBG;
