import { StyleSheet } from 'react-native';
import { Font } from '.';
import colors from './colors';
import { isiPhone } from '../utils';

const infoStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    marginTop: isiPhone ? 0 : 10,
  },
  title: {
    color: colors.black,
    fontFamily: Font.bold,
    textAlign: 'center',
    fontSize: 22,
    marginTop: '10%',
    marginBottom: '5%',
  },
  subTitle: {
    color: colors.black,
    fontFamily: Font.bold,
    textAlign: 'left',
    fontSize: 16,
    marginVertical: 15,
  },
  contactTitle: {
    color: colors.black,
    fontFamily: Font.bold,
    textAlign: 'left',
    fontSize: 14,
    marginVertical: 15,
  },
  text: {
    color: colors.black,
    fontFamily: Font.regular,
    textAlign: 'left',
    fontSize: 14,
  },
});

export default infoStyle;
