import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import { deviceHeight, deviceWidth, isApple } from '@utils';

const smallScreenHeight = deviceHeight <= 700;

const selectStyle = StyleSheet.create({
  selectWrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '12%',
    justifyContent: 'flex-end',
    marginBottom: smallScreenHeight ? '2%' : '5%',
    marginTop: '5%',
  },
  selectChordsWrapper: {
    display: 'flex',
    height: '20%',
    justifyContent: 'flex-end',
    marginBottom: smallScreenHeight ? '2%' : '5%',
    marginTop: '5%',
  },
  selectTextExp: {
    color: colors.black,
    fontFamily: Font.regular,
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
  selectInput: {
    alignItems: 'center',
    backgroundColor: colors.whiteTransparent,
    borderRadius: 30,
    borderWidth: 0,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    marginHorizontal: '20%',
    marginVertical: 10,
    width: '60%',
  },
  selectInputText: {
    color: colors.black,
    fontFamily: Font.regular,
    fontSize: 14,
    textAlign: 'center',
  },
  selectListWrapper: {
    borderRadius: 30,
    marginBottom: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '15%',
    maxWidth: 500,
    overflow: isApple ? 'scroll' : 'hidden',
    width: '90%',
    zIndex: 2,
  },
  selectListOverlay: {
    backgroundColor: colors.blackTransparent,
    height: deviceHeight,
    left: 0,
    position: 'absolute',
    top: 0,
    width: deviceWidth,
    zIndex: 1,
  },
  selectList: {
    backgroundColor: colors.white,
    borderColor: colors.blue,
    borderRadius: 30,
    borderWidth: 2,
    flexGrow: 1,
    width: '100%',
  },
  selectItem: {
    borderBottomColor: colors.blueTransparent,
    borderBottomWidth: 1,
    width: '100%',
  },
  selectItemNoBorder: {
    borderBottomWidth: 0,
  },
  selectText: {
    fontFamily: Font.regular,
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  selectListArrow: {
    aspectRatio: 1 / 1,
    position: 'absolute',
    right: 14,
    width: 10,
  },
});

export default selectStyle;
