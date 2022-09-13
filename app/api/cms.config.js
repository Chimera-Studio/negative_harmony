// @flow
import axios from 'axios';
import { secondsToMilliseconds } from 'date-fns';
// $FlowFixMe[cannot-resolve-module] (Git Ignored)
import ENV from '../../env.json'; /* eslint-disable-line import/no-unresolved */

const cmsClient: any = axios.create({
  baseURL: ENV.CMS.GRAPHQL_URL + ENV.CMS.SPACE,
  timeout: secondsToMilliseconds(6),
  headers: {
    'Content-Type': 'application/vnd.contentful.delivery.v1+json',
    'X-Contentful-User-Agent':
      'contentful.js/0.0.0-determined-by-semantic-release',
    'Accept-Encoding': 'gzip',
    'user-agent': 'node.js/12',
    Authorization: `Bearer ${ENV.CMS.AUTHORIZATION}`,
  },
});

cmsClient.interceptors.request.use((config: any) => config, () => null);
cmsClient.interceptors.response.use((response: any) => response, () => null);

export default cmsClient;
