// @flow
import React from 'react';
import type { Node } from 'react';
import {
  Svg, Path, G, Circle,
} from 'react-native-svg';

type Props = {
  style?: Object,
};

function Info(props: Props): Node {
  return (
    <Svg
      viewBox="0 0 53.9 53.9"
      style={props.style}
    >
      <G>
        <Circle
          fill="#fff"
          cx="26.95"
          cy="26.95"
          r="26.95"
        />
        <Path
          fill="#3c5e99"
          d="M827,2060.94a3.89,3.89,0,1,1,2.72,1.11A3.69,3.69,0,0,1,827,2060.94Zm2.72,26.4h0a3.26,3.26,0,0,1-3.27-3.27v-16.88a3.27,3.27,0,0,1,3.27-3.27h0a3.27,3.27,0,0,1,3.26,3.27v16.88A3.26,3.26,0,0,1,829.72,2087.34Z"
          transform="translate(-802.54 -2044.96)"
        />
      </G>
    </Svg>
  );
}

export default Info;
