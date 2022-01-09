import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { AdMobRewarded } from "expo-ads-admob";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-native";
import { useHistory } from "react-router-dom";
import { get } from "lodash";

import Exit from "../../assets/icons/Exit";

import useLocale from "../../locales";
import { useAdmobIds } from "../../utils";
import { actions } from "../../store/globalStore";

import colors from "../../styles/colors";
import main_style from "../../styles/main_style";
import rewarded_style from "../../styles/rewarded_style";

const Rewarded = () => {
  const t = useLocale;
  const dispatch = useDispatch();
  const history = useHistory();
  const cmsData = useSelector((state) => state.cms.master);
  const unlocked = useSelector((state) => state.global.unlocked);
  const admobId = useAdmobIds(get(cmsData, "adIds", null)).rewarded;
  const [timeoutState, setTimeoutState] = useState(null);
  const [loading, setLoading] = useState(false);
  const screenOpacity = useRef(new Animated.Value(0)).current;

  const handleBack = (e) => {
    if (loading) {
      e.preventDefault();

      return;
    }

    dispatch(actions.showBanner(true));
  };

  const handleReset = () => {
    setTimeoutState(
      setTimeout(() => {
        setLoading(false);
      }, 5000)
    );
  };

  const handleRequest = async () => {
    setLoading(true);
    await AdMobRewarded.setAdUnitID(admobId);
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };

  AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
    handleReset();
  });

  AdMobRewarded.addEventListener("rewardedVideoDidFailToPresent", () => {
    handleReset();
  });

  AdMobRewarded.addEventListener("rewardedVideoDidPresent", () => {
    handleReset();
  });

  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
    dispatch(actions.unlockChords());
    clearTimeout(timeoutState);
  });

  const handleScreenAnimation = (to) => {
    Animated.timing(screenOpacity, {
      toValue: to,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  useEffect(() => {
    if (unlocked) {
      clearTimeout(timeoutState);
      history.push("/chords");
    }
  }, [unlocked]);

  useEffect(() => {
    handleScreenAnimation(1);

    return () => handleScreenAnimation(0);
  }, []);

  return (
    <Animated.View style={[rewarded_style.wrapper, { opacity: screenOpacity }]}>
      <Link
        to="/chords"
        onPress={(e) => handleBack(e)}
        underlayColor={colors.transparent}
        style={main_style.exit}
      >
        <Exit color={!loading ? colors.blue : colors.disabled} />
      </Link>
      <View style={rewarded_style.paragraph}>
        <Text style={rewarded_style.paragraphText}>
          {t("rewarded.paragraph_1")}
        </Text>
        <Text style={rewarded_style.paragraphText}>
          {t("rewarded.paragraph_2")}
        </Text>
      </View>
      <TouchableOpacity
        style={!loading ? rewarded_style.start : rewarded_style.disabled}
        activeOpacity={1}
        disabled={loading}
        onPress={handleRequest}
      >
        {!loading ? (
          <Text style={rewarded_style.startText}>{t("rewarded.cta")}</Text>
        ) : (
          <ActivityIndicator size="large" color={colors.white} />
        )}
      </TouchableOpacity>
      <Text style={rewarded_style.disclamer}>{t("rewarded.disclamer")}</Text>
    </Animated.View>
  );
};

export default Rewarded;
