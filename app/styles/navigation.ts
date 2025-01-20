import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import { isTablet, isiPhone } from '@utils';

const navigationStyle = StyleSheet.create({
  navigation: {
    alignItems: 'center',
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
  appEnvironment: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    left: '50%',
    position: 'absolute',
    transform: [{ translateX: -50 }],
    width: 100,
  },
  appEnvironmentText: {
    color: colors.black,
    fontFamily: Font.regular,
    fontSize: isTablet ? 14 : 12,
  },
});

export default navigationStyle;
