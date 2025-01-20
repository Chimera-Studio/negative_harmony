import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import { isiPhone } from '@utils';

const rewardedStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    marginTop: isiPhone ? 0 : 10,
  },
  paragraph: {
    marginTop: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraphText: {
    color: colors.black,
    textAlign: 'center',
    fontFamily: Font.bold,
    fontSize: 24,
    marginVertical: 2,
  },
  start: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    width: '75%',
    height: 70,
    borderRadius: 35,
    marginTop: 60,
    marginBottom: 30,
  },
  disabled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.disabled,
    width: '75%',
    height: 70,
    borderRadius: 35,
    marginTop: 60,
    marginBottom: 30,
  },
  startText: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: Font.bold,
    fontSize: 20,
  },
  disclaimer: {
    color: colors.black,
    textAlign: 'center',
    fontFamily: Font.regular,
    fontSize: 12,
  },
});

export default rewardedStyle;
