import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import {
  deviceHeight, deviceWidth, isApple, isTablet,
} from '@utils';

const smallScreenHeight = deviceHeight <= 700;

const scalesChordsStyle = StyleSheet.create({
  legendContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  legend: {
    aspectRatio: 5 / 1,
    marginBottom: 5,
    width: '80%',
  },
  legendExtra: {
    backgroundColor: colors.whiteTransparent,
    borderRadius: isTablet ? 20 : 15,
    display: 'flex',
    flexDirection: 'row',
    height: isTablet ? '30%' : '32%',
    justifyContent: 'space-between',
    width: '80%',
  },
  disclaimerBtn: {
    width: '42%',
  },
  disclaimer: {
    height: '100%',
  },
  wrapper: {
    flex: 1,
    position: 'relative',
  },
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
  selectDisabledText: {
    fontFamily: Font.regular,
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
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
  circleWrapper: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    aspectRatio: 1 / 1,
    marginBottom: '40%',
    marginLeft: '40%',
    marginRight: '40%',
    marginTop: '40%',
    position: 'absolute',
    width: '18%',
    zIndex: 4,
  },
  circleKeys: {
    aspectRatio: 1 / 1,
    width: '100%',
    zIndex: 3,
  },
  selectedScaleNameWrapper: {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  selectedScaleKey: {
    color: colors.white,
    fontFamily: Font.bold,
    fontSize: 32,
    marginRight: 3,
  },
  selectedScaleName: {
    color: colors.black,
    fontFamily: Font.bold,
    fontSize: 16,
    marginLeft: 3,
    textTransform: 'lowercase',
  },
  chordsWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rewardedOpen: {
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: 35,
    display: 'flex',
    height: 70,
    justifyContent: 'center',
    width: '75%',
  },
  rewardedOpenText: {
    color: colors.white,
    fontFamily: Font.bold,
    fontSize: 18,
    textAlign: 'center',
  },
  scrollChords: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  scrollChordsExpText: {
    color: colors.black,
    fontFamily: Font.regular,
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
  scrollChordsWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  scrollChordsSpace: {
    backgroundColor: colors.black,
    height: 90,
  },
  scrollChordsNoteSelected: {
    alignItems: 'center',
    aspectRatio: 1 / 1,
    backgroundColor: colors.blue,
    borderRadius: 90,
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 90,
  },
  scrollChordsNote: {
    alignItems: 'center',
    aspectRatio: 1 / 1,
    backgroundColor: colors.white,
    borderColor: colors.blue,
    borderRadius: 90,
    borderWidth: 4,
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 90,
  },
  scrollChordsNoteTextSelected: {
    color: colors.white,
    fontFamily: Font.bold,
    fontSize: 22,
    textAlign: 'center',
    width: 44,
  },
  scrollChordsNoteText: {
    color: colors.blue,
    fontFamily: Font.bold,
    fontSize: 22,
    textAlign: 'center',
    width: 44,
  },
});

export default scalesChordsStyle;
