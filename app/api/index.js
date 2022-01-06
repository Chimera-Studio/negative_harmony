import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cms, localStorageKeys } from "../tokens";
import cmsHeader from "./cms.config";

export const fetchTimestamps = async (query) => {
  try {
    const response = await axios.post(
      cms.graphql_url + cms.space,
      {
        query: query,
      },
      cmsHeader
    );
    if (response.status == 200) {
      const res = await AsyncStorage.getItem(
        localStorageKeys.contentTimestamps
      );

      const formatCMS = {
        master: new Date(
          response.data.data.appCollection.items[0].sys.publishedAt
        ).valueOf(),
        patterns: new Date(
          response.data.data.negativeHarmonyCollection.items[0].sys.publishedAt
        ).valueOf(),
      };

      const data = { local: JSON.parse(res), cms: formatCMS };
      return data;
    }
  } catch (err) {
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
