import React from 'react';
import { Path, Svg } from 'react-native-svg';
import colors from '@styles/colors';

type Props = {
  fill?: string,
  style?: Object,
};

function Play(props: Props) {
  return (
    <Svg
      viewBox="0 0 512 512"
      style={props.style}
      fill={props.fill || colors.disabled}
    >
      <Path d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
    </Svg>
  );
}

export default Play;
