// @flow
import React from 'react';
import type { Node } from 'react';
import GradientBackground from './GradientBackground';
import WhiteBackground from './WhiteBackground';
import { useLocationInfo } from '../../../utils/hooks';

function Backgrounds(): Node {
  const locationInfo = useLocationInfo();
  if (locationInfo.isScales || locationInfo.isChords) return <GradientBackground />;

  return <WhiteBackground />;
}

export default Backgrounds;
