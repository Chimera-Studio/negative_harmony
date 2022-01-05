import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
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
import styles from "../../styles/styles";

const Rewarded = (props) => {
  const t = useLocale;
  const dispatch = useDispatch();
  const history = useHistory();
  const cmsData = useSelector((state) => state.cms.master);
  const admobId = useAdmobIds(get(cmsData, "adIds", null)).rewarded;
  const [timeout, setTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBack = (e) => {
    if (loading) e.preventDefault();
  };

  const handleReset = () => {
    setTimeout(
      setTimeout(() => {
        setLoading(false);
      }, 10000)
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
    setTimeout(
      setTimeout(() => {
        setLoading(false);
      }, 10000)
    );
  });

  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
    history.push("/chords");
    dispatch(actions.unlockChords());
  });

  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.rewardedWrapper}>
      <Link
        to="/chords"
        onPress={(e) => handleBack(e)}
        underlayColor={colors.transparent}
        style={styles.exit}
      >
        <Exit color={!loading ? colors.blue : colors.disabled} />
      </Link>
      <View style={styles.rewardedExp}>
        <Text style={styles.rewardedExpText}>{t("rewarded.paragraph_1")}</Text>
        <Text style={styles.rewardedExpText}>{t("rewarded.paragraph_2")}</Text>
      </View>
      <TouchableOpacity
        style={!loading ? styles.rewardedStart : styles.rewardedDisabled}
        activeOpacity={1}
        disabled={loading}
        onPress={handleRequest}
      >
        {!loading ? (
          <Text style={styles.rewardedStartText}>{t("rewarded.cta")}</Text>
        ) : (
          <ActivityIndicator size="large" color={colors.white} />
        )}
      </TouchableOpacity>
      <Text style={styles.rewardedDisc}>{t("rewarded.disclamer")}</Text>
    </View>
  );
};

export default Rewarded;
