import { StyleSheet } from 'react-native';
import { Font } from '@styles';
import colors from '@styles/colors';

const scalesStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
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
});

export default scalesStyle;
