// @flow
import { StyleSheet } from 'react-native';
import {
  deviceHeight, deviceWidth, isApple, isiPhone,
} from '../utils';
import colors from './colors';

type MainStyle = {
  container: Object,
  safe: Object,
  scrollContainer: Object,
  scrollDeviceContainer: Object,
  alert: Object,
  alertText: Object,
  exit: Object,
  exitDisabled: Object,
  ads: Object,
  adSpace: Object,
};

const mainStyle: MainStyle = StyleSheet.create({
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
    fontFamily: 'NegativeHarmony-Bold',
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
  ads: {
    alignItems: 'center',
    // backgroundColor: colors.black,
    bottom: isiPhone ? '4.5%' : '2%',
    display: 'flex',
    height: '10%',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },
  adSpace: {
    // backgroundColor: colors.black,
    height: deviceHeight * (isApple ? 0.1 : 0.14),
    width: '100%',
  },
});

export default mainStyle;
