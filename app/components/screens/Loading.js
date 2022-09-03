import React from 'react';
import {
  ActivityIndicator, SafeAreaView, StatusBar, StyleSheet,
} from 'react-native';
import GradientBG from '../elements/backgrounds/GradientBackground';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <GradientBG />
      <ActivityIndicator size="large" color={colors.white} />
    </SafeAreaView>
  );
}

export default Loading;
