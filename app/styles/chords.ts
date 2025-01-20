import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';

const chordsStyle = StyleSheet.create({
  soundButtonWrapper: {
    justifyContent: 'center',
    width: '100%',
  },
  soundButtonSplitWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  soundButtonBoth: {
    alignItems: 'flex-end',
    backgroundColor: colors.blue,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  soundButton: {
    alignItems: 'flex-end',
    backgroundColor: colors.blue,
    borderRadius: 25,
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
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
