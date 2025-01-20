import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@styles/colors';
import { isiPhone } from '@utils';

const styles = StyleSheet.create({
  background: {
    ...(isiPhone && { flex: 1 }),
    backgroundColor: colors.blue,
    bottom: 0,
    height: '120%',
    left: '-10%',
    position: 'absolute',
    right: 0,
    top: '-5%',
    width: '120%',
  },
  gradient: {
    height: '100%',
    opacity: 0.8,
    width: '100%',
  },
});

function GradientBackground() {
  return (
    <View style={styles.background}>
      <LinearGradient
        style={styles.gradient}
        colors={[colors.gradientGreen, colors.gradientBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </View>
  );
}

export default GradientBackground;
