// @flow
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import InAppReview from 'react-native-in-app-review';
import { RewardedAd } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import {
  addMonths, minutesToMilliseconds, secondsToMilliseconds,
} from 'date-fns';
import { useSelector } from 'react-redux';
import { isEqual, keys } from 'lodash';
import { localStorageKeys } from '../tokens';
import { rewardedKeywords } from '../tokens/keywords';
import { symbolFlat, symbolSharp } from './patterns';
import { PortalContext } from '../context';
import { isPromise } from '.';
import type { PortalProps } from '../context';
import type { ReduxState } from '../types';
import type { ChordPlaying } from '../components/containers/bottom/BottomChords';

export const getItem = async (key: string): any => {
  try {
    const response = await AsyncStorage.getItem(key);

    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

export const setItem = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    Promise.reject(error);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Promise.reject(error);
  }
};

export const useLocalStorage = (): {
  getItem: Function,
  setItem: Function,
  removeItem: Function,
} => ({
  getItem,
  setItem,
  removeItem,
});

export const useReview = (): Function => {
  const { loadTime, reviewMinutes, unlocked }: {
    loadTime: number,
    reviewMinutes: number,
    unlocked: boolean,
  } = useSelector((state: ReduxState) => ({
    loadTime: state.static.loadTime,
    reviewMinutes: state.static.reviewMinutes,
    unlocked: state.global.unlocked,
  }), isEqual);
  const localStorage = useLocalStorage();
  const isAvailable = InAppReview.isAvailable();

  const handleReview = async () => {
    const currentTime = Date.now();
    const reviewEnabled = (loadTime + minutesToMilliseconds(reviewMinutes)) <= currentTime;

    if (!isAvailable) return;

    if (unlocked && reviewEnabled) {
      const reviewTimestamp = await localStorage.getItem(localStorageKeys.reviewTimestamp);

      if (!reviewTimestamp || Number(reviewTimestamp) <= currentTime) {
        InAppReview.RequestInAppReview().then((successful) => {
          if (successful) {
            const newTimestamp = addMonths(currentTime, 1).valueOf();
            localStorage.setItem(localStorageKeys.reviewTimestamp, JSON.stringify(newTimestamp));
          }
        });
      }
    }
  };

  return handleReview;
};

export type LocationInfo = {
  current: string,
  isScales: boolean,
  isChords: boolean,
  isRewarded: boolean,
  isInfo: boolean,
}

export const useLocationInfo = (): LocationInfo => {
  const location = useLocation();
  const isScales = location.pathname === '/';
  const isChords = location.pathname === '/chords';
  const isRewarded = location.pathname === '/rewarded';
  const isInfo = location.pathname === '/info';

  return {
    current: location.pathname,
    isScales,
    isChords,
    isRewarded,
    isInfo,
  };
};

export const useTeleport = (): PortalProps => useContext(PortalContext);

export const useRewardedAd = (
  rewardedId: string,
  showPersonalisedAds: boolean,
): Object|null => {
  const [rewardedAd, setRewardedAd] = useState(null);

  useEffect(() => {
    const handleNewAd = async (): Object => {
      const response = await RewardedAd.createForAdRequest(rewardedId, {
        requestNonPersonalizedAdsOnly: !showPersonalisedAds,
        keywords: rewardedKeywords,
      });
      setRewardedAd(response);
    };

    if (!rewardedAd || !isPromise(rewardedAd)) handleNewAd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return rewardedAd;
};

export const useCountdown = (onTimeEnd: Function, countdownFrom: ?number) => {
  const [time, setTime] = useState(countdownFrom || 0);
  const timerRef = useRef(time);

  useEffect(() => {
    if (countdownFrom) {
      timerRef.current = countdownFrom;
      setTime(timerRef.current);
    }
  }, [countdownFrom]);

  useEffect(() => {
    if (!countdownFrom) return;

    const timerId = setInterval(() => {
      timerRef.current -= secondsToMilliseconds(1);

      if (timerRef.current < 0 && countdownFrom) {
        onTimeEnd();
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, secondsToMilliseconds(1));

    return () => clearInterval(timerId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export type Note = { diatonic: boolean, note: string };
export type UseSoundChords = {
  chordsPause: Function,
  chordsPlay: Function,
};

export const useSoundChords = (): UseSoundChords => {
  Sound.setCategory('Playback');
  const playbackRef = useRef<{[string]: any}>({});

  const chordsPause = () => {
    const notes = keys(playbackRef.current);
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      playbackRef.current[note].stop();
      playbackRef.current[note].release();
    }

    playbackRef.current = {};
  };

  const chordsPlay = (notes: Note[], type: ChordPlaying) => {
    const isNegative = type === 'negative';
    const chord = [...notes];

    for (let index = 0; index < chord.length; index++) {
      const { note } = chord[index];
      const soundPath = (note.includes(symbolSharp) || note.includes(symbolFlat)) ? note.charAt(0) + '_sharp' : note;
      const soundKey = (isNegative ? 'low_' : '') + soundPath.toLowerCase();

      const sound = new Sound(`${soundKey}.mp3`, Sound.MAIN_BUNDLE, (error) => {
        if (error) return;

        sound.setVolume(0.8);
        sound.play();
      });

      playbackRef.current[soundKey] = sound;
    }
  };

  return {
    chordsPause: () => chordsPause(),
    chordsPlay: (notes: Note[], type: ChordPlaying) => chordsPlay(notes, type),
  };
};
