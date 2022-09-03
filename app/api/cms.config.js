// @flow
import axios from 'axios';
// $FlowFixMe[cannot-resolve-module] (Git Ignored)
import ENV from '../../env.json'; /* eslint-disable-line import/no-unresolved */

export const requestTimeoutMs: number = 120000;

const cmsClient: any = axios.create({
  baseURL: ENV.CMS.GRAPHQL_URL + ENV.CMS.SPACE,
  timeout: requestTimeoutMs,
  headers: {
    'Content-Type': 'application/vnd.contentful.delivery.v1+json',
    'X-Contentful-User-Agent':
      'contentful.js/0.0.0-determined-by-semantic-release',
    'Accept-Encoding': 'gzip',
    'user-agent': 'node.js/12',
    Authorization: `Bearer ${ENV.CMS.AUTHORIZATION}`,
  },
});

export default cmsClient;
