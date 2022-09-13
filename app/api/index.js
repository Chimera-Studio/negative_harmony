// @flow
import CodePush from 'react-native-code-push';
import {
  get, has, isEqual, omit,
} from 'lodash';
import { localStorageKeys, appKeys, codepush } from '../tokens';
import cmsClient from './cms.config';
import {
  PRODUCTION_QUERY,
  STAGING_QUERY,
  VALID_PRODUCTION_QUERY,
  VALID_STAGING_QUERY,
} from './cms.querys';
import { deviceInfo } from '../utils';
import { getItem } from '../utils/hooks';

export type InitialCMSResponse = {
  data: {
    master: Object,
    scales: Object,
    chords: Object,
  } | Object,
  timestamps: {
    announcement: number|string,
    local: {
      master: number,
      announcement: number,
    } | string,
    online: {
      master: ?number,
      announcement: ?number,
    } | string,
  },
  isLocal?: boolean,
};

export const fetchData = async (query: string): Promise<any> => {
  const response = await cmsClient.post('', { query });

  if (response && response.status === 200) {
    return response.data.data;
  }

  return null;
};

export const fetchLocalTimestamps = async (): Promise<{ announcement: Object|string, local: Object|string }> => {
  const contentTimestamps = await getItem(localStorageKeys.contentTimestamps);
  const announcementTimestamp = await getItem(localStorageKeys.announcementTimestamp);

  const local = contentTimestamps ? JSON.parse(contentTimestamps) : appKeys.noLocalData;
  const announcement = announcementTimestamp
    ? JSON.parse(announcementTimestamp)
    : appKeys.noLocalData;

  return { local, announcement };
};

export const fetchCMSTimestamps = async (query: string): Promise<{ master: ?number, announcement: ?number } | string> => {
  const response = await cmsClient.post('', { query });

  if (response && response.status === 200) {
    const master = get(response.data, 'data.appCollection.items[0].sys.publishedAt');
    const announcement = get(response.data, 'data.announcementCollection.items[0].sys.publishedAt');

    return {
      master: master ? new Date(master).valueOf() : null,
      announcement: announcement ? new Date(announcement).valueOf() : null,
    };
  }

  return appKeys.noConnection;
};

export const fetchCMS = async (deploymentEnvironment: 'Production'|'Staging'): Promise<InitialCMSResponse> => {
  const isProduction = deviceInfo.isRealDevice && deploymentEnvironment === 'Production';

  const cmsTimestampsResponse = await fetchCMSTimestamps(isProduction ? VALID_PRODUCTION_QUERY : VALID_STAGING_QUERY);
  const localTimestampsResponse = await fetchLocalTimestamps();

  const fullTimestampsResponse = {
    ...localTimestampsResponse,
    online: cmsTimestampsResponse,
  };

  const localTimestamps = get(fullTimestampsResponse, 'local');
  const onlineTimestamps = get(fullTimestampsResponse, 'online');
  const timestampsAreEqual = isEqual(localTimestamps, onlineTimestamps);
  const hasLocalData = !isEqual(localTimestamps, appKeys.noLocalData);
  const hasOnlineData = !isEqual(onlineTimestamps, appKeys.noConnection);

  let dataResponse = {};
  if (hasLocalData && (timestampsAreEqual || !hasOnlineData)) {
    const response = await getItem(localStorageKeys.appContent);

    dataResponse = {
      data: JSON.parse(response),
      isLocal: true,
    };
  }

  if (hasOnlineData && (!timestampsAreEqual || !hasLocalData)) {
    let cmsResponse = await fetchData(isProduction ? PRODUCTION_QUERY : STAGING_QUERY);
    if (!isProduction) {
      cmsResponse = {
        appCollection: {
          items: [
            {
              adIds: get(cmsResponse, 'appCollection.items[0].adIds'),
              ads: get(cmsResponse, 'appCollection.items[0].adsStaging', false),
              resetRewards: get(cmsResponse, 'appCollection.items[0].resetRewardsStaging', 24),
              keepRewards: get(cmsResponse, 'appCollection.items[0].keepRewardsStaging', 6),
            },
          ],
        },
        announcementCollection: get(cmsResponse, 'announcementCollection'),
        negativeHarmonyCollection: get(cmsResponse, 'negativeHarmonyCollection'),
      };
    }

    dataResponse = {
      data: cmsResponse,
      isLocal: false,
    };
  }

  // $FlowFixMe
  return { ...dataResponse, timestamps: fullTimestampsResponse };
};

export const getDeploymentData = async (): Promise<any> => {
  const response = await CodePush.getUpdateMetadata();

  if (!has(response, 'deploymentKey')) {
    return {
      environment: 'Production',
    };
  }

  const newResponse = omit(response, 'install');
  const isProduction = get(newResponse, 'deploymentKey', codepush[deviceInfo.isApple ? 'ios' : 'android'].production) === codepush[deviceInfo.isApple ? 'ios' : 'android'].production;

  return {
    environment: isProduction ? 'Production' : 'Staging',
    ...newResponse,
  };
};
