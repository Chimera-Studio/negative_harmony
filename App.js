// @flow
import React, { useEffect, useState } from 'react';
import CodePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import ErrorBoundary from './app/components/containers/errors/ErrorBoundary';
import PortalProvider from './app/components/containers/portal/PortalProvider';
import Body from './app/components/Body';
import { getDeviceInfo } from './app/utils';
import { configureStore } from './app/store';
import { config } from './app/tokens';
import { actions } from './app/store/globalStore';
import type { ReduxState } from './app/types';

const initialState: ReduxState = {
  static: {
    reviewMinutes: 2,
    loadTime: Date.now(),
  },
  global: {
    developerMode: false,
    axis: { status: false, angle: 0 },
    activeKey: {
      x: 0, y: 0, group: null, field: null,
    },
    showAds: false,
    personalisedAds: false,
    unlocked: !config.ads,
  },
};
const store = configureStore(initialState);

function App() {
  const [setupPending, setSetupPending] = useState(true);

  useEffect(() => {
    getDeviceInfo().then((res) => {
      store.dispatch(actions.toggleDeveloperMode(!res.isRealDevice));
    }).finally(() => {
      setSetupPending(false);
      SplashScreen.hide();
    });
  }, []);

  if (setupPending) return null;

  return (
    <Provider store={store}>
      <ErrorBoundary store={store}>
        <PortalProvider>
          <Body />
        </PortalProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default (CodePush(App): any);
