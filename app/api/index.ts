import CodePush from 'react-native-code-push';
import { get, has, omit } from 'lodash';
import { codepush } from '../tokens';
import { deviceInfo } from '../utils';

export const getDeploymentData = async (): Promise<any> => {
  const response = await CodePush.getUpdateMetadata();

  if (!has(response, 'deploymentKey')) {
    return { environment: 'Production' };
  }

  const newResponse = omit(response, 'install');
  const isProduction = get(newResponse, 'deploymentKey', codepush[deviceInfo.isApple ? 'ios' : 'android'].production) === codepush[deviceInfo.isApple ? 'ios' : 'android'].production;

  return {
    environment: isProduction ? 'Production' : 'Staging',
    ...newResponse,
  };
};
