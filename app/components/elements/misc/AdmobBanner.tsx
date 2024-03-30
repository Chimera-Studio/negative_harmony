import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { isEqual } from 'lodash';
import { selectors } from '../../../store/staticStore';
import mainStyle from '../../../styles/main';
import { config } from '../../../tokens';
import { isTablet } from '../../../utils';
import { useAppSelector, useLocationInfo } from '../../../utils/hooks';

function AdmobBanner() {
  const locationInfo = useLocationInfo();
  const { banner, showAds, personalisedAds } = useAppSelector((state) => ({
    banner: selectors.getAdmobIds(state).banner,
    showAds: state.global.showAds,
    personalisedAds: state.global.personalisedAds,
  }), isEqual);

  const handleBannerSize = (): string => {
    if (isTablet) return BannerAdSize.FULL_BANNER;

    return BannerAdSize.BANNER;
  };

  if (locationInfo.isRewarded) return null;

  return (
    <View style={mainStyle.ads}>
      {config.ads && showAds && banner && (
        <BannerAd
          unitId={banner}
          size={handleBannerSize()}
          requestOptions={{
            requestNonPersonalizedAdsOnly: !personalisedAds,
          }}
        />
      )}
    </View>
  );
}

export default AdmobBanner;
