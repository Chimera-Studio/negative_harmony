import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RewardedAdEventType } from 'react-native-google-mobile-ads';
import { Link, useNavigate } from 'react-router-native';
import { isEqual } from 'lodash';
import Exit from '../../assets/icons/Exit';
import useLocale from '../../locales';
import { actions } from '../../store/globalStore';
import { selectors } from '../../store/staticStore';
import colors from '../../styles/colors';
import mainStyle from '../../styles/main';
import rewardedStyle from '../../styles/rewarded';
import { useAppDispatch, useAppSelector, useRewardedAd } from '../../utils/hooks';

function Rewarded() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { personalisedAds, rewarded } = useAppSelector((state) => ({
    personalisedAds: state.global.personalisedAds,
    rewarded: selectors.getAdmobIds(state).rewarded,
  }), isEqual);
  const [adLoading, setAdLoading] = useState(true);
  const rewardedAd = useRewardedAd(rewarded || '', personalisedAds || false);
  const screenOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!rewardedAd) return;

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

    return () => {
      rewardedAd?.removeAllListeners();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardedAd]);

  useEffect(() => {
    const handleScreenAnimation = (to: any) => {
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
    rewardedAd?.show().catch(() => {});
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
      <Text style={rewardedStyle.disclaimer}>{t('rewarded.disclaimer')}</Text>
    </Animated.View>
  );
}

export default Rewarded;
