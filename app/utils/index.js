import { Platform } from "react-native";
import * as StoreReview from "expo-store-review";
import * as Device from "expo-device";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocation } from "react-router-dom";
import { localStorageKeys, admob } from "../tokens";

export const isRealDevice = Device.isDevice;
export const isApple = Platform.OS === "ios";
export const isPad = Platform.isPad;
export const isProduction = Constants.appOwnership !== "expo" && isRealDevice;

export const useReview = async (unlocked, reviewDelay) => {
  const date = Date.now();
  if (unlocked && reviewDelay <= date) {
    const timestamp = await AsyncStorage.getItem(
      localStorageKeys.reviewTimestamp
    );

    if (Number(timestamp) <= date || Number(timestamp) === 0) {
      if (
        (await StoreReview.isAvailableAsync()) &&
        (await StoreReview.hasAction())
      ) {
        StoreReview.requestReview();
      }

      const newTimestamp = new Date(date)
        .setMonth(new Date(date).getMonth() + 1)
        .valueOf();
      await AsyncStorage.setItem(
        localStorageKeys.reviewTimestamp,
        JSON.stringify(newTimestamp)
      );
    }
  }
};

export const storeDataToLocal = async (key, dataString) => {
  await AsyncStorage.setItem(key, dataString);
};

export const useAdmobIds = (adIds) => {
  const realAd = isRealDevice && isProduction;
  let adId = null;

  const getBannerID = () => {
    if (!adIds) return null;

    if (isApple) {
      adId = realAd ? adIds.banner.ios : admob.banner.ios_test;
    } else {
      adId = realAd ? adIds.banner.android : admob.banner.android_test;
    }

    return adId;
  };

  const getRewardedID = () => {
    if (!adIds) return null;

    if (isApple) {
      adId = realAd ? adIds.rewarded.ios : admob.rewarded.ios_test;
    } else {
      adId = realAd ? adIds.rewarded.android : admob.rewarded.android_test;
    }

    return adId;
  };

  return {
    banner: getBannerID(),
    rewarded: getRewardedID(),
  };
};

export const useLocationInfo = () => {
  const location = useLocation();
  const pathScales = location.pathname === "/";
  const pathChords = location.pathname === "/chords";
  const pathRewarded = location.pathname === "/rewarded";
  const pathInfo = location.pathname === "/info";

  return {
    current: location.pathname,
    isScales: pathScales,
    isChords: pathChords,
    isRewarded: pathRewarded,
    isInfo: pathInfo,
  };
};
