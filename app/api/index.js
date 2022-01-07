import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cms, localStorageKeys, appKeys } from "../tokens";
import cmsHeader from "./cms.config";
import { VALID_QUERY } from "./cms";

export const fetchLocalTimestamps = async () => {
  const res = await AsyncStorage.getItem(localStorageKeys.contentTimestamps);

  const data = JSON.parse(res);
  return data;
};

export const fetchCMSTimestamps = async () => {
  try {
    const response = await axios.post(
      cms.graphql_url + cms.space,
      {
        query: VALID_QUERY,
      },
      cmsHeader
    );
    if (response.status == 200) {
      const data = {
        master: new Date(
          response.data.data.appCollection.items[0].sys.publishedAt
        ).valueOf(),
        patterns: new Date(
          response.data.data.negativeHarmonyCollection.items[0].sys.publishedAt
        ).valueOf(),
      };

      return data;
    }
  } catch (err) {
    return appKeys.noConnection;
    // console.error(err);
  }
};

export const cmsFetch = async (query) => {
  try {
    const response = await axios.post(
      cms.graphql_url + cms.space,
      {
        query: query,
      },
      cmsHeader
    );
    if (response.status == 200) {
      return response.data.data;
    }
  } catch (err) {
    // console.error(err);
  }
};
