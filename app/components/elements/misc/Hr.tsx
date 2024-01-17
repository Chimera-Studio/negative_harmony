// @flow
import React from 'react';
import type { Node } from 'react';
import { View } from 'react-native';
import colors from '../../../styles/colors';

type Props = {
  color?: string,
  height?: number,
  paddingX?: number,
  paddingY?: number,
};

function Hr(props: Props): Node {
  const height = props.height || 2;
  const color = props.color || colors.white;

  return (
    <View
      style={{
        width: '100%',
        paddingVertical: props.paddingY || null,
        paddingHorizontal: props.paddingX || null,
      }}
    >
      <View
        style={{
          backgroundColor: color,
          borderRadius: height / 2,
          height,
          width: '100%',
        }}
      />
    </View>
  );
}

export default Hr;
