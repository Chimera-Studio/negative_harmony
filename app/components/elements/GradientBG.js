import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../styles/colors";

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
    backgroundColor: colors.blue,
    bottom: 0,
    flex: Platform.OS === "ios" && !Platform.isPad ? null : 1,
    height: "120%",
    left: "-10%",
    position: "absolute",
    right: 0,
    top: "-5%",
    width: "120%",
  },
  gradient: {
    height: "100%",
    opacity: 0.8,
    width: "100%",
  },
});

export default GradientBG;
