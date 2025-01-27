import { useState } from 'react';
import en from '@locales/en.json';
import get from 'lodash/get';

const availableLanguages = { en };

type Props = {
  t: (path: string) => string,
  setLanguage: (key: string) => void,
};

export const t = (path: string, lng: string = 'en'): string => get(availableLanguages, `${lng}.${path}`, path);

const useLocale = (): Props => {
  const [lng, setLng] = useState('en');

  return {
    t: (path: string) => t(path, lng),
    setLanguage: setLng,
  };
};

export default useLocale;
