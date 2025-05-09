import { useContext, useRef } from 'react';
import InAppReview from 'react-native-in-app-review';
import Sound from 'react-native-sound';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { useLocation } from 'react-router-native';
import { PortalContext } from '@context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localStorageKeys } from '@tokens';
import { symbolFlat, symbolSharp } from '@utils/patterns';
import { addMonths, minutesToMilliseconds } from 'date-fns';
import {
  flatten, forEach, isEqual, values,
} from 'lodash';
import type { AppDispatch, RootState } from '@store';

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
  const { loadTime, reviewMinutes }: { loadTime: number, reviewMinutes: number } = useAppSelector((state) => ({
    loadTime: state.static.loadTime,
    reviewMinutes: state.static.reviewMinutes,
  }), isEqual);
  const isAvailable = InAppReview.isAvailable();

  const handleReview = async () => {
    const currentTime = Date.now();
    const reviewEnabled = (loadTime + minutesToMilliseconds(reviewMinutes)) <= currentTime;

    if (!isAvailable) return;

    if (reviewEnabled) {
      const reviewTimestamp = await localStorage.getItem(localStorageKeys.reviewTimestamp);

      if (!reviewTimestamp || Number(reviewTimestamp) <= currentTime) {
        InAppReview.RequestInAppReview().then((successful) => {
          if (successful) {
            const newTimestamp = addMonths(currentTime, 1).valueOf();
            localStorage.setItem(localStorageKeys.reviewTimestamp, JSON.stringify(newTimestamp));
          }
        }).catch(() => { });
      }
    }
  };

  return handleReview;
};

export const useLocationInfo = () => {
  const location = useLocation();
  const isScales = location.pathname === '/';
  const isChords = location.pathname === '/chords';
  const isInfo = location.pathname === '/info';

  return {
    current: location.pathname,
    isScales,
    isChords,
    isInfo,
  };
};

export const useTeleport = () => useContext(PortalContext);

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
  positive: Array<any>
  negative: Array<any>
};

export const useSoundChords = () => {
  const playbackRef = useRef<SoundChords>({ positive: [], negative: [] });
  Sound.setCategory('Playback');

  const initSound = (soundPath: string): any => {
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
      sound?.release();
    });
    playbackRef.current = { positive: [], negative: [] };
    initChords(chords);
  };

  const play = (type: ChordPlaying) => {
    if (type === ChordPlaying.both) {
      const sounds = flatten(values(playbackRef.current));
      forEach(sounds, (sound) => {
        sound?.play();
      });

      return;
    }

    forEach(playbackRef.current[type], (sound) => {
      sound?.play();
    });
  };

  const pause = () => {
    const sounds = flatten(values(playbackRef.current));
    forEach(sounds, (sound) => {
      sound?.stop();
    });
  };

  return {
    switchChords,
    play,
    pause,
  };
};
