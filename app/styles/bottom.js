// @flow
import { StyleSheet } from 'react-native';
import { deviceHeight } from '../utils';
import colors from './colors';

type BottomStyle = {
  space: Object,
  wrapper: Object,
  scale: Object,
  scaleText: Object,
  axis: Object,
  chord: Object,
  chordName: Object,
  tonic: Object,
  name: Object,
  notes: Object,
  notesText: Object,
};

const smallScreenHeight = deviceHeight <= 700;

const bottomStyle: BottomStyle = StyleSheet.create({
  space: {
    height: smallScreenHeight ? '37%' : '32%',
    position: 'relative',
    width: '100%',
  },
  wrapper: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: '-15%',
    elevation: 0,
    height: '100%',
    justifyContent: 'flex-start',
    left: '-5%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    position: 'absolute',
    width: '110%',
    zIndex: 1,
  },
  scale: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxHeight: '25%',
    minHeight: 40,
  },
  scaleText: {
    fontFamily: 'NegativeHarmony-Bold',
    fontSize: 15,
    textAlign: 'center',
    width: 30,
  },
  axis: {
    backgroundColor: colors.blue,
    borderRadius: 6,
    height: 6,
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
  },
  chord: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: '25%',
    minHeight: 40,
  },
  chordName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
  tonic: {
    fontFamily: 'NegativeHarmony-Bold',
    fontSize: 26,
    marginRight: 3,
  },
  name: {
    color: colors.positiveText,
    fontFamily: 'NegativeHarmony-Bold',
    fontSize: 16,
    marginLeft: 3,
  },
  notes: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
  notesText: {
    display: 'flex',
    flexShrink: 1,
    flexWrap: 'wrap',
    fontFamily: 'NegativeHarmony-Bold',
    fontSize: 15,
    marginHorizontal: 2,
    textAlign: 'center',
    width: 28,
  },
});

export default bottomStyle;
