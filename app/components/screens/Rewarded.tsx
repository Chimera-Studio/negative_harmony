// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RewardedAdEventType } from 'react-native-google-mobile-ads';
import { Link, useNavigate } from 'react-router-native';
import { isEqual } from 'lodash';
import Exit from '../../assets/icons/Exit';
import useLocale from '../../locales';
import { useRewardedAd } from '../../utils/hooks';
import { actions } from '../../store/globalStore';
import rewardedStyle from '../../styles/rewarded';
import mainStyle from '../../styles/main';
import colors from '../../styles/colors';
import { selectors } from '../../store/staticStore';
import type { ReduxState } from '../../types';

function Rewarded(): Node {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { personalisedAds, rewarded } = useSelector((state: ReduxState) => ({
    personalisedAds: state.global.personalisedAds,
    rewarded: selectors.getAdmobIds(state).rewarded,
  }), isEqual);
  const [adLoading, setAdLoading] = useState(true);
  const rewardedAd = useRewardedAd(rewarded, personalisedAds);
  const screenOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (rewardedAd) {
      rewardedAd.addAdEventListener(
        RewardedAdEventType.LOADED, () => {
          setAdLoading(false);
        });

      rewardedAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD, () => {
          dispatch(actions.unlockChords());
          navigate('/chords');
        },
      );

      rewardedAd.load();
    }

    return () => {
      rewardedAd?.removeAllListeners();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardedAd]);

  useEffect(() => {
    const handleScreenAnimation = (to) => {
      Animated.timing(screenOpacity, {
        toValue: to,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    };

    handleScreenAnimation(1);

    return () => handleScreenAnimation(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestReward = () => {
    rewardedAd?.show();
  };

  return (
    <Animated.View style={[rewardedStyle.wrapper, { opacity: screenOpacity }]}>
      <Link
        to="/chords"
        underlayColor={colors.transparent}
        style={mainStyle.exit}
      >
        <Exit color={colors.blue} />
      </Link>
      <View style={rewardedStyle.paragraph}>
        <Text style={rewardedStyle.paragraphText}>
          {t('rewarded.paragraph_1')}
        </Text>
        <Text style={rewardedStyle.paragraphText}>
          {t('rewarded.paragraph_2')}
        </Text>
      </View>
      <TouchableOpacity
        style={adLoading ? rewardedStyle.disabled : rewardedStyle.start}
        activeOpacity={1}
        disabled={adLoading}
        onPress={requestReward}
      >
        {adLoading ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : (
          <Text style={rewardedStyle.startText}>{t('rewarded.cta')}</Text>
        )}
      </TouchableOpacity>
      <Text style={rewardedStyle.disclamer}>{t('rewarded.disclamer')}</Text>
    </Animated.View>
  );
}

export default Rewarded;