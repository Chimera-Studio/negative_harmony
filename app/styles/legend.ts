import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';
import { isTablet } from '@utils';

const legendStyle = StyleSheet.create({
  legendContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    zIndex: 99,
  },
  legendContainerOffset: {
    marginTop: -10,
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
  legendSwitch: {
    alignItems: 'center',
    aspectRatio: 5.5 / 1,
    backgroundColor: colors.whiteTransparent,
    borderRadius: isTablet ? 20 : 15,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '80%',
  },
  legendSwitchText: {
    color: colors.black,
    fontFamily: Font.regular,
    fontSize: 12,
    textAlign: 'center',
  },
  legendSwitchCTA: {
    color: colors.black,
    fontFamily: Font.bold,
    fontSize: 12,
    textAlign: 'center',
  },
  disclaimerBtn: {
    width: '42%',
  },
  disclaimer: {
    height: '100%',
  },
});

export default legendStyle;
