import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { useSelector } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import ConditionalAd from './ConditionalAd';
import { selectors } from '../../../store/staticStore';
import mainStyle from '../../../styles/main';
import { isTablet } from '../../../utils';
import { useLocationInfo } from '../../../utils/hooks';
import type { ReduxState } from '../../../types';

function AdmobBanner() {
  const locationInfo = useLocationInfo();
  const { banner, showAds, personalisedAds } = useSelector((state: ReduxState) => ({
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
      {!isEmpty(banner) && banner && showAds && (
        <ConditionalAd>
          <BannerAd
            unitId={banner}
            size={handleBannerSize()}
            requestOptions={{
              requestNonPersonalizedAdsOnly: !personalisedAds,
            }}
          />
        </ConditionalAd>
      )}
    </View>
  );
}

export default AdmobBanner;
