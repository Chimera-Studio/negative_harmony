// @flow
import React from 'react';
import type { Node } from 'react';
import WhiteBackground from './WhiteBackground';
import GradientBackground from './GradientBackground';
import { useLocationInfo } from '../../../utils/hooks';

function Backgrounds(): Node {
  const locationInfo = useLocationInfo();
  if (locationInfo.isInfo || locationInfo.isRewarded) return <WhiteBackground />;

  return <GradientBackground />;
}

export default Backgrounds;
