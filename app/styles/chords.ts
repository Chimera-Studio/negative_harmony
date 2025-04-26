import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';

const chordsStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  chordsWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
    backgroundColor: colors.transparent,
    height: 90,
  },
  scrollChordsNoteSelected: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  scrollChordsNote: {
    alignItems: 'center',
    aspectRatio: 1 / 1,
    backgroundColor: colors.white,
    borderColor: colors.blueTransparent,
    borderRadius: 90,
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 90,
  },
  soundButtonWrapper: {
    justifyContent: 'center',
    width: '100%',
  },
  soundButtonSplitWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  soundButtonContainer: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  soundButtonBoth: {
    backgroundColor: colors.blue,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  soundButton: {
    backgroundColor: colors.blue,
    borderRadius: 25,
    width: '45%',
    marginHorizontal: '2.5%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  soundButtonIcon: {
    alignSelf: 'center',
    height: 20,
    marginRight: 5,
    width: 20,
  },
  soundButtonText: {
    color: colors.white,
    fontFamily: Font.bold,
    marginLeft: 5,
    textAlign: 'center',
  },
});

export default chordsStyle;
