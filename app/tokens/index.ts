import { get } from 'lodash';
import ENV from '../../env.json';

export const config = {
  ads: get(ENV, 'CONFIG.ADS', true),
  keepRewards: get(ENV, 'CONFIG.KEEP_REWARDS', 6),
  resetRewards: get(ENV, 'CONFIG.RESET_REWARDS', 24),
};

export const admob = {
  banner: {
    android_test: 'ca-app-pub-3940256099942544/6300978111',
    ios_test: 'ca-app-pub-3940256099942544/2934735716',
    android: get(ENV, 'CONFIG.AD_IDS.BANNER.ANDROID', ''),
    ios: get(ENV, 'ENV.CONFIG.AD_IDS.BANNER.IOS', ''),
  },
  rewarded: {
    android_test: 'ca-app-pub-3940256099942544/5224354917',
    ios_test: 'ca-app-pub-3940256099942544/1712485313',
    android: get(ENV, 'CONFIG.AD_IDS.REWARDED.ANDROID', ''),
    ios: get(ENV, 'CONFIG.AD_IDS.REWARDED.IOS', ''),
  },
};

export const codepush = {
  android: {
    production: '4ijAnhf96jc8n0bXMofRN3ACQw_KxrG_TM8C8',
    staging: 'AFWU_38JpHuG5zdhZUwXi1JExnDjREl2F6UL3',
  },
  ios: {
    production: 'ysiNZaKV7hLp8M6utIr4qzMgviXGpaE4FGhON',
    staging: 'ToO1rxsE1l9ljpn0FvCF2nGjXHdscr8tUCfHD',
  },
};

export const localStorageKeys = {
  reviewTimestamp: 'reviewTimestamp',
  rewardedAt: 'rewardedAt',
};
