import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { AdMobRewarded } from "expo-ads-admob";
import { Link } from "react-router-native";
import { useHistory } from "react-router-dom";

import Exit from "../assets/icons/Exit";

import colors from "../styles/colors";
import styles from "../styles/styles";

const Rewarded = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleBack = (e) => {
    if (loading) e.preventDefault();
  };

  const handleReset = () => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  };

  const handleRequest = async () => {
    setLoading(true);
    await AdMobRewarded.setAdUnitID(
      Platform.OS === "ios" ? props.ads.ios : props.ads.android
    ); // 1. iOS, 2. Android
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
    props.reward("chords");
    history.push("/chords");
  });

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
        <Text style={styles.rewardedExpText}>To unlock chords</Text>
        <Text style={styles.rewardedExpText}>watch this Advert:</Text>
      </View>
      <TouchableOpacity
        style={!loading ? styles.rewardedStart : styles.rewardedDisabled}
        activeOpacity={1}
        disabled={loading}
        onPress={handleRequest}
      >
        {!loading ? (
          <Text style={styles.rewardedStartText}>Watch the Ad</Text>
        ) : (
          <ActivityIndicator size="large" color={colors.white} />
        )}
      </TouchableOpacity>
      <Text style={styles.rewardedDisc}>
        If no Advert is shown come back a bit later
      </Text>
    </View>
  );
};

export default Rewarded;
