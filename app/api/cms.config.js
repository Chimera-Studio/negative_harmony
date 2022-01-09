import { cms } from "../tokens";

const cmsHeader = {
  headers: {
    "Content-Type": "application/vnd.contentful.delivery.v1+json",
    "X-Contentful-User-Agent":
      "contentful.js/0.0.0-determined-by-semantic-release",
    "Accept-Encoding": "gzip",
    "user-agent": "node.js/12",
    Authorization: `Bearer ${cms.authorization}`,
  },
};

export default cmsHeader;
