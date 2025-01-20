import React from 'react';
import { useLocationInfo } from '@utils/hooks';
import GradientBackground from './GradientBackground';
import WhiteBackground from './WhiteBackground';

function Backgrounds() {
  const locationInfo = useLocationInfo();
  if (locationInfo.isScales || locationInfo.isChords) return <GradientBackground />;

  return <WhiteBackground />;
}

export default Backgrounds;
