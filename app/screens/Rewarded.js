import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { AdMobRewarded } from "expo-ads-admob";

import colors from "../styles/colors";
import styles from "../styles/styles";

const Rewarded = () => {
  const [loadRewarded, setLoadRewarded] = useState(false);

  const rewardedTimeOut = () => {
    setLoadRewarded(true);
  };

  AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
    resetRewarded();
  });

  AdMobRewarded.addEventListener("rewardedVideoDidFailToPresent", () => {
    resetRewarded();
  });

  AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
    resetRewarded();
  });

  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
    unlockChords();
  });

  function resetRewarded() {
    if (chordsUnlocked == false) {
      setTimeout(function () {
        setLoadRewarded(false);
      }, 10000);
    }
  }

  async function requestReward() {
    rewardedTimeOut();

    await AdMobRewarded.setAdUnitID(
      Platform.OS === "ios" ? admob_ios.rewarded : admob_android.rewarded
    ); // 1. iOS, 2. Android
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  }

  function unlockChords() {
    visibleScales = true;
    chordsUnlocked = true;
    showInitialScales();
    showInitialChords();
  }

  return (
    <View style={styles.rewardedWrapper}>
      <TouchableOpacity
        style={styles.exit}
        disabled={loadRewarded}
        onPress={(showScales(), showInitialChords())}
      >
        <Svg height="100%" width="100%" viewBox="0 0 352 352">
          <Path
            fill={!loadRewarded ? colors.blue : colors.disabled}
            d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
          />
        </Svg>
      </TouchableOpacity>
      <View style={styles.rewardedExp}>
        <Text style={styles.rewardedExpText}>To unlock chords</Text>
        <Text style={styles.rewardedExpText}>watch this Advert:</Text>
      </View>
      <TouchableOpacity
        style={!loadRewarded ? styles.rewardedStart : styles.rewardedDisabled}
        activeOpacity={1}
        disabled={loadRewarded}
        onPress={() => requestReward()}
      >
        {!loadRewarded ? (
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
