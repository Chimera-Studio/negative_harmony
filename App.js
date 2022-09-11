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
import type { ReduxState } from './app/types';

const initialState: ReduxState = {
  static: {
    reviewMinutes: 2,
    loadTime: Date.now(),
  },
  global: {
    axis: { status: false, angle: 0 },
    activeKey: {
      x: 0, y: 0, group: null, field: null,
    },
    showAds: true,
    unlocked: false,
  },
};
const store = configureStore(initialState);

function App() {
  const [setupPending, setSetupPending] = useState(true);

  useEffect(() => {
    const handleDeviceSetup = async () => {
      await getDeviceInfo();
      setSetupPending(false);
      SplashScreen.hide();
    };

    handleDeviceSetup();
  }, []);

  if (setupPending) return null;

  return (
    <ErrorBoundary store={store}>
      <Provider store={store}>
        <PortalProvider>
          <Body />
        </PortalProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default (CodePush(App): any);
