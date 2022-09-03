// @flow
import { StyleSheet } from 'react-native';
import colors from './colors';

type ChordsStyle = {
  ...Object
};

const chordsStyle: ChordsStyle = StyleSheet.create({
  soundButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  soundButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: colors.blue,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  soundButtonText: {
    textAlign: 'center',
    fontFamily: 'NegativeHarmony-Bold',
    marginLeft: 5,
    color: colors.white,
  },
});

export default chordsStyle;
