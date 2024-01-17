import React from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text,
} from 'react-native';
import { secondsToMilliseconds } from 'date-fns';
import GradientBG from '../elements/backgrounds/GradientBackground';
import Logo from '../elements/misc/Logo';
import colors from '../../styles/colors';
import useLocale from '../../locales';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  logo: {
    aspectRatio: 1 / 1,
    width: '80%',
  },
  text: {
    bottom: '10%',
    color: colors.white,
    fontFamily: 'NegativeHarmony',
    fontSize: 20,
    position: 'absolute',
  },
});

function Loading() {
  const { t } = useLocale();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <GradientBG />
      <Logo style={styles.logo} animationSpeed={secondsToMilliseconds(5)} />
      <Text style={styles.text}>{t('loading')}</Text>
    </SafeAreaView>
  );
}

export default Loading;
