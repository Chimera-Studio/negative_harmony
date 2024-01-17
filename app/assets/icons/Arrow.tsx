// @flow
import React from 'react';
import type { Node } from 'react';
import { Svg, Path } from 'react-native-svg';
import colors from '../../styles/colors';

type Props = {
  style?: Object,
};

function Arrow(props: Props): Node {
  return (
    <Svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 255 255"
      style={props.style}
      fill={colors.disabled}
    >
      <Path
        d="M140.5,184.1l60.3-104.5c5.8-10-1.4-22.5-13-22.5H67.2c-11.5,0-18.8,12.5-13,22.5l60.3,104.5C120.3,194.1,134.7,194.1,140.5,184.1z"
      />
    </Svg>
  );
}

export default Arrow;
