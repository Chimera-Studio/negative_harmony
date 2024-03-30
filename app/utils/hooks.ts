import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { RewardedAd } from 'react-native-google-mobile-ads';
import InAppReview from 'react-native-in-app-review';
import Sound from 'react-native-sound';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useLocation } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMonths, minutesToMilliseconds } from 'date-fns';
import {
  flatten, forEach, isEqual, values,
} from 'lodash';
import { isPromise } from '.';
import { symbolFlat, symbolSharp } from './patterns';
import { PortalContext } from '../context';
import { localStorageKeys } from '../tokens';
import { rewardedKeywords } from '../tokens/keywords';
import type { AppDispatch, RootState } from '../store';

export const getItem = async (key: string) => {
  try {
    const response = await AsyncStorage.getItem(key);

    return response;
  } catch (error) {
    Promise.reject(error);
  }

  return null;
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

export const localStorage = {
  getItem,
  setItem,
  removeItem,
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useReview = () => {
  const { loadTime, reviewMinutes, unlocked }: {
    loadTime: number,
    reviewMinutes: number,
    unlocked: boolean,
  } = useAppSelector((state) => ({
    loadTime: state.static.loadTime,
    reviewMinutes: state.static.reviewMinutes,
    unlocked: state.global.unlocked,
  }), isEqual);
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
        }).catch(() => {});
      }
    }
  };

  return handleReview;
};

export const useLocationInfo = () => {
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

export const useTeleport = () => useContext(PortalContext);

export const useRewardedAd = (rewardedId: string, showPersonalisedAds: boolean) => {
  const [rewardedAd, setRewardedAd] = useState<RewardedAd | null>(null);

  useEffect(() => {
    const handleNewAd = () => {
      const response = RewardedAd.createForAdRequest(rewardedId, {
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

export enum ChordPlaying {
  positive = 'positive',
  negative = 'negative',
  both = 'both',
}

export type Note = { diatonic: boolean, note: string };

export type ChordNotes = {
  positive: Note[]
  negative: Note[]
};

type SoundChords = {
  positive: Sound[]
  negative: Sound[]
};

export const useSoundChords = () => {
  const playbackRef = useRef<SoundChords>({ positive: [], negative: [] });
  Sound.setCategory('Playback');

  const initSound = (soundPath: string): Sound => {
    const sound = new Sound(soundPath, Sound.MAIN_BUNDLE, (error) => {
      if (error) return;

      sound.setVolume(0.8);
    });

    return sound;
  };

  const initChords = (chords: ChordNotes) => {
    forEach(chords, (notes, key) => {
      const isNegative = key === 'negative';
      forEach(notes, ({ note }) => {
        const soundPath = (note.includes(symbolSharp) || note.includes(symbolFlat)) ? note.charAt(0) + '_sharp' : note;
        const soundKey = (isNegative ? 'low_' : '') + soundPath.toLowerCase();

        playbackRef.current[key as 'positive' | 'negative'].push(initSound(`${soundKey}.mp3`));
      });
    });
  };

  const switchChords = (chords: ChordNotes) => {
    const sounds = flatten(values(playbackRef.current));
    forEach(sounds, (sound) => {
      sound.release();
    });
    playbackRef.current = { positive: [], negative: [] };
    initChords(chords);
  };

  const play = (type: ChordPlaying) => {
    if (type === ChordPlaying.both) {
      const sounds = flatten(values(playbackRef.current));
      forEach(sounds, (sound) => {
        sound.play();
      });

      return;
    }

    forEach(playbackRef.current[type], (sound) => {
      sound.play();
    });
  };

  const pause = () => {
    const sounds = flatten(values(playbackRef.current));
    forEach(sounds, (sound) => {
      sound.stop();
    });
  };

  return {
    initChords,
    switchChords,
    play,
    pause,
  };
};
