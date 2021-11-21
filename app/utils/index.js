import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocation } from "react-router-dom";

export const useReview = async (chordsUnlocked, time) => {
  const date = Date.now();
  if (chordsUnlocked && time <= date) {
    const timestamp = await AsyncStorage.getItem("reviewTimestamp");

    if (
      (Number(timestamp) <= date || Number(timestamp) === 0) &&
      (await StoreReview.isAvailableAsync()) &&
      (await StoreReview.hasAction())
    ) {
      StoreReview.requestReview();

      const newTimestamp = new Date(date)
        .setMonth(new Date(date).getMonth() + 1)
        .valueOf();
      await AsyncStorage.setItem(
        "reviewTimestamp",
        JSON.stringify(newTimestamp)
      );
    }
  }
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
