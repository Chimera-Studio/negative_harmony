import React from "react";
import { useLocationInfo } from "../utils";

import WhiteBG from "../elements/WhiteBG";
import GradientBG from "../elements/GradientBG";

const BG = () => {
  const locationInfo = useLocationInfo();
  if (locationInfo.isInfo || locationInfo.isRewarded) return <WhiteBG />;
  return <GradientBG />;
};

export default BG;
