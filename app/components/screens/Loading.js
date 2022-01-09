import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import GradientBG from "../elements/GradientBG";
import colors from "../../styles/colors";

function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <GradientBG />
      <ActivityIndicator size="large" color={colors.white} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});

export default Loading;
