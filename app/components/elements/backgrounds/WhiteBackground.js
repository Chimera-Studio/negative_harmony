// @flow
import React from 'react';
import type { Node } from 'react';
import { StyleSheet, View } from 'react-native';
import { isiPhone } from '../../../utils';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  background: {
    ...(isiPhone && { flex: 1 }),
    backgroundColor: colors.white,
    bottom: 0,
    height: '120%',
    left: '-10%',
    position: 'absolute',
    right: 0,
    top: '-5%',
    width: '120%',
  },
});

function WhiteBackground(): Node {
  return <View style={styles.background} />;
}

export default WhiteBackground;
