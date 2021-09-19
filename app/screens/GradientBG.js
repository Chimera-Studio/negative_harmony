import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";

function GradientBG() {
  return (
    <View style={styles.background}>
      <LinearGradient
        colors={[colors.gradientBlue, colors.gradientGreen]}
        style={styles.gradient}
      />
    </View>
  );
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
    backgroundColor: colors.blue,
    flex: Platform.OS === "ios" && !Platform.isPad ? null : 1,
  },
  gradient: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
});

export default GradientBG;
