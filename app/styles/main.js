// @flow
import { StyleSheet } from 'react-native';
import { isApple, isiPhone } from '../utils';
import colors from './colors';

type MainStyle = {
  ...Object
};

const mainStyle: MainStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginHorizontal: '5%',
    position: 'relative',
    width: '90%',
  },
  safe: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    maxWidth: 500,
    width: '100%',
  },
  scrollContainer: {
    backgroundColor: colors.white,
    flexGrow: 1,
    position: 'relative',
    width: '90%',
  },
  alert: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    display: 'flex',
    elevation: 2,
    height: isApple ? '18%' : '17%',
    justifyContent: 'flex-end',
    left: '-5%',
    paddingBottom: 30,
    position: 'absolute',
    top: isiPhone ? 0 : '-5%',
    width: '110%',
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
    top: 0,
    width: 25,
  },
  exitDisabled: {
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 25,
  },
  ads: {
    alignItems: 'center',
    bottom: isiPhone ? '4.5%' : 0,
    display: 'flex',
    height: '10%',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },
});

export default mainStyle;
