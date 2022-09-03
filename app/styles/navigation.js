// @flow
import { StyleSheet } from 'react-native';
import { isiPhone } from '../utils';
import colors from './colors';

type NavigationStyle = {
  navigation: Object,
  switch: Object,
  switchText: Object,
  info: Object,
};

const navigationStyle: NavigationStyle = StyleSheet.create({
  navigation: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    marginTop: isiPhone ? 0 : 10,
    width: '100%',
  },
  switch: {
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: 40,
    height: 30,
    justifyContent: 'center',
    paddingVertical: 0,
    width: 70,
  },
  switchText: {
    color: colors.white,
    fontFamily: 'NegativeHarmonyBold',
    fontSize: 12,
    textAlign: 'center',
  },
  info: {
    width: 30,
    height: 30,
  },
});

export default navigationStyle;
