import 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Body from '../app/components/Body';
import PortalProvider from '../app/components/containers/portal/PortalProvider';
import { store } from '../app/store';
import { GlobalTypes } from '../app/store/globalStore';

it('Body: triggers API calls', () => {
  let container: renderer.ReactTestRenderer;
  const dispatchSpy = jest.spyOn(store, 'dispatch');

  renderer.act(() => {
    container = renderer.create(
      <Provider store={store}>
        <PortalProvider>
          <Body />
        </PortalProvider>
      </Provider>,
    );
  });

  renderer.act(() => {
    container.unmount();
  });

  expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ type: GlobalTypes.GB_GET_DEPLOYMENT_DATA }));
  dispatchSpy.mockClear();
});
