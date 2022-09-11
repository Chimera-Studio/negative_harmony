// @flow
import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import PortalProvider from '../app/components/containers/portal/PortalProvider';
import Body from '../app/components/Body';
import cmsClient from '../app/api/cms.config';
import { configureStore } from '../app/store';
import { types } from '../app/store/globalStore';

const store = configureStore({});

describe('Body tests', () => {
  test('renders correctly', () => {
    jest.spyOn(store, 'dispatch');

    renderer.create(
      <Provider store={store}>
        <PortalProvider>
          <Body />
        </PortalProvider>
      </Provider>,
    );
  });

  test('triggers API calls', () => {
    jest.spyOn(cmsClient, 'get').mockResolvedValue();
    const storeSpy = jest.spyOn(store, 'dispatch');

    renderer.create(
      <Provider store={store}>
        <PortalProvider>
          <Body />
        </PortalProvider>
      </Provider>,
    );

    expect(storeSpy).toBeCalledWith(expect.objectContaining({ type: types.GB_GET_DEPLOYMENT_DATA }));
  });
});
