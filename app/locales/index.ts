import { useState } from 'react';
import get from 'lodash/get';
import en from './en.json';

type AvailableLanguages = {
  en: Object,
};

const availableLanguages: AvailableLanguages = {
  en,
};

type Props = {
  t: Function,
  setLanguage: Function,
};

export const t = (key: string, lng: string = 'en'): string => get(availableLanguages, `${lng}.${key}`, String(key));

const useLocale = (): Props => {
  const [lng, setLng] = useState('en');

  return {
    t: (key: string) => t(key, lng),
    setLanguage: (key: any) => setLng(key),
  };
};

export default useLocale;
