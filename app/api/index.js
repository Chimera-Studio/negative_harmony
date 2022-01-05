import axios from "axios";
import { cms } from "../tokens";
import cmsHeader from "./cms.config";

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
