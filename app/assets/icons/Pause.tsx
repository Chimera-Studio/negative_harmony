import React from 'react';
import { Path, Svg } from 'react-native-svg';
import colors from '../../styles/colors';

type Props = {
  fill?: string,
  style?: Object,
};

function Pause(props: Props) {
  return (
    <Svg
      viewBox="0 0 512 512"
      style={props.style}
      fill={props.fill || colors.disabled}
    >
      <Path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
    </Svg>
  );
}

export default Pause;
