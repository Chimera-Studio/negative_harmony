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
import { selectors as selectorsCMS } from '../../../store/cmsStore';
import mainStyle from '../../../styles/main';
import type { ReduxState } from '../../../types';

type Props = {
  showAd: boolean,
};

function AdmobBanner(props: Props): Node {
  const { banner } = useSelector(selectorsCMS.getAdmobIds, isEqual);
  const redux = useSelector((state: ReduxState) => ({
    showAds: state.global.showAds,
    personalisedAds: state.global.personalisedAds,
  }), isEqual);
  const locationInfo = useLocationInfo();

  const handleBannerSize = (): string => {
    if (isTablet) return BannerAdSize.FULL_BANNER;

    return BannerAdSize.BANNER;
  };

  if (locationInfo.isRewarded) return null;

  return (
    <View style={mainStyle.ads}>
      {props.showAd && !isEmpty(banner) && redux.showAds && (
        <ConditionalAd>
          <BannerAd
            unitId={banner}
            size={handleBannerSize()}
            requestOptions={{
              requestNonPersonalizedAdsOnly: !redux.personalisedAds,
            }}
          />
        </ConditionalAd>
      )}
    </View>
  );
}

export default AdmobBanner;
