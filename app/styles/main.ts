import { StatusBar, StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import {
  deviceHeight, deviceWidth, isApple, isiPhone,
} from '@utils';

const mainStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  safe: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 500,
    paddingTop: isApple ? 0 : StatusBar.currentHeight,
    position: 'relative',
    width: '90%',
  },
  scrollContainer: {
    backgroundColor: colors.white,
    flexGrow: 1,
    position: 'relative',
    width: '90%',
  },
  scrollDeviceContainer: {
    flexGrow: 1,
    minHeight: deviceHeight,
    width: '100%',
  },
  alert: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    display: 'flex',
    elevation: 2,
    height: isApple ? '18%' : '16%',
    justifyContent: 'flex-end',
    left: 0,
    paddingBottom: 30,
    position: 'absolute',
    top: isiPhone ? 0 : '-5%',
    width: deviceWidth,
    zIndex: 99,
  },
  alertText: {
    color: colors.black,
    fontFamily: Font.bold,
    fontSize: 18,
    textAlign: 'center',
  },
  exit: {
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 0,
    top: isiPhone ? 0 : 10,
    width: 25,
  },
  exitDisabled: {
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 0,
    top: isiPhone ? 0 : 10,
    width: 25,
  },
});

export default mainStyle;
