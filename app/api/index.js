import axios from "axios";
import { cms } from "../tokens";

export const cmsFetch = async (query, callback) => {
  await axios
    .post(
      cms.graphql_url + cms.space,
      {
        query,
      },
      {
        headers: {
          "Content-Type": "application/vnd.contentful.delivery.v1+json",
          "X-Contentful-User-Agent":
            "contentful.js/0.0.0-determined-by-semantic-release",
          "Accept-Encoding": "gzip",
          "user-agent": "node.js/12",
          Authorization: `Bearer ${cms.authorization}`,
        },
      }
    )
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log("Error happened during fetching!", err);
    });
};
