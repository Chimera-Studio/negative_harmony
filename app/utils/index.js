import * as StoreReview from 'expo-store-review';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocation } from 'react-router-dom';

export const useReview = async (chordsUnlocked, time) => {
  if (chordsUnlocked && time <= new Date().valueOf()) {
    const numberDATE = new Date().valueOf();
    const timeStamp = await AsyncStorage.getItem('reviewTimestamp');

    if (
      (Number(timeStamp) <= numberDATE || Number(timeStamp) === 0)
      && (await StoreReview.isAvailableAsync())
      && (await StoreReview.hasAction())
    ) {
      StoreReview.requestReview();

      const newTimeStamp = numberDATE;
      new Date(numberDATE)
        .setMonth(new Date(numberDATE).getMonth() + 1)
        .valueOf();
      await AsyncStorage.setItem(
        'reviewTimestamp',
        JSON.stringify(newTimeStamp),
      );
    }
  }
};

export const useLocationInfo = () => {
  const location = useLocation();
  const pathHome = location.pathname === '/';

  return {
    current: location.pathname,
    isHome: pathHome,
  };
};
