import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';

const gridStyle = StyleSheet.create({
  gridWrapper: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    marginHorizontal: 'auto',
    position: 'relative',
    width: '100%',
  },
  gridRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    width: '100%',
  },
  noteBtn: {
    alignItems: 'center',
    aspectRatio: 1 / 1,
    backgroundColor: colors.white,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
    width: '18%',
  },
  noteBtnSelected: {
    backgroundColor: colors.blue,
  },
  noteWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  noteTxtWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
  },
  noteTxt: {
    fontFamily: Font.bold,
    color: colors.negativeText,
    fontSize: 16,
  },
  noteSymbol: {
    fontFamily: Font.bold,
    color: colors.positiveText,
    fontSize: 18,
  },
  noteTxtSelected: {
    color: colors.white,
  },
  noteSymbolSelected: {
    color: colors.whiteGray,
  },
});

export default gridStyle;
