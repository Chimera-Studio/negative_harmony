import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import colors from "../styles/colors";

function WhiteBG() {
  return <View style={styles.background} />;
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white,
    bottom: 0,
    flex: Platform.OS === "ios" && !Platform.isPad ? null : 1,
    height: "120%",
    left: "-10%",
    position: "absolute",
    right: 0,
    top: "-5%",
    width: "120%",
  },
});

export default WhiteBG;
