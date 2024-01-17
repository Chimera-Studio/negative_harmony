// @flow
import React from 'react';
import type { Node } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { isEmpty, isEqual } from 'lodash';
import ConditionalAd from './ConditionalAd';
import { isTablet } from '../../../utils';
import { useLocationInfo } from '../../../utils/hooks';
import mainStyle from '../../../styles/main';
import type { ReduxState } from '../../../types';
import { selectors } from '../../../store/staticStore';

function AdmobBanner(): Node {
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
      {!isEmpty(banner) && showAds && (
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
