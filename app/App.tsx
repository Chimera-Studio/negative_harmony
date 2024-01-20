import React, { useEffect, useState } from 'react';
import CodePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import Body from './components/Body';
import ErrorBoundary from './components/containers/errors/ErrorBoundary';
import PortalProvider from './components/containers/portal/PortalProvider';
import { store } from './store';
import { actions } from './store/globalStore';
import { getDeviceInfo } from './utils';

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
      <ErrorBoundary>
        <PortalProvider>
          <Body />
        </PortalProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default CodePush(App);
