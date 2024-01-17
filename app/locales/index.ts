// @flow
import { useState } from 'react';
import get from 'lodash/get';
import en from './en.json';

type AvailabeLanguages = {
  en: Object,
};

const availabeLanguages: AvailabeLanguages = {
  en,
};

type Props = {
  t: Function,
  setLanguage: Function,
};

export const t = (key: string, lng: string = 'en'): string => get(availabeLanguages[lng], key, key.toString());

const useLocale = (): Props => {
  const [lng, setLng] = useState('en');

  return {
    t: (key: string) => t(key, lng),
    setLanguage: (key) => setLng(key),
  };
};

export default useLocale;
