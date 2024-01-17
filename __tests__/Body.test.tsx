import 'react-native';
import { Provider } from 'react-redux';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Body from '../app/components/Body';
import PortalProvider from '../app/components/containers/portal/PortalProvider';
import { configureStore } from '../app/store';
import { types } from '../app/store/globalStore';

describe('Body tests', () => {
  const store = configureStore({});

  test('triggers API calls', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');

    renderer.create(
      <Provider store={store}>
        <PortalProvider>
          <Body />
        </PortalProvider>
      </Provider>,
    );

    expect(storeSpy).toHaveBeenCalledWith(expect.objectContaining({ type: types.GB_GET_DEPLOYMENT_DATA }));
  });
});
