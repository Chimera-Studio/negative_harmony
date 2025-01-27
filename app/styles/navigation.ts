import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import { isiPhone } from '@utils';

const navigationStyle = StyleSheet.create({
  navigation: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    marginTop: isiPhone ? 0 : 10,
    position: 'relative',
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
    fontFamily: Font.bold,
    fontSize: 12,
    textAlign: 'center',
  },
  info: {
    width: 30,
    height: 30,
  },
});

export default navigationStyle;
