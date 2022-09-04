// @flow
import React, { useEffect, useRef } from 'react';
import type { Node } from 'react';
import {
  Animated,
  Easing,
  Text,
  View,
} from 'react-native';
import { includes, map } from 'lodash';
import { deviceHeight } from '../../../utils';
import { useLocationInfo } from '../../../utils/hooks';
import bottomStyle from '../../../styles/bottom';
import colors from '../../../styles/colors';
import mainStyle from '../../../styles/main';

type Props = {
  data: any,
};

function Bottom(props: Props): Node {
  const locationInfo = useLocationInfo();
  // const [positivePlaying, setPositivePlaying] = useState(false);
  // const [negativePlaying, setNegativePlaying] = useState(false);
  const slideUp = useRef(new Animated.Value(deviceHeight / 2)).current;
  const { data } = props;
  const animateBottom = {
    transform: [{ translateY: slideUp }],
  };

  const handleNegativeChordName = (positiveChord, negativeChord) => {
    if (positiveChord === '5 chord') return '-' + positiveChord;
    if (positiveChord === 'dim7') return '13♭5sus';
    if (positiveChord === '7sus4') return 'maj7♭5';

    return negativeChord;
  };

  const handleNegativeChordNote = (positiveChord, notesArray) => {
    if (includes(['m6', '6 chord', 'dim7'], positiveChord)) {
      return notesArray[notesArray.length - 2].note;
    }

    return notesArray[notesArray.length - 1].note;
  };

  // const handlePlay = (type, notesArray) => {
  //   if (type === 'positive') setPositivePlaying(!positivePlaying);
  //   if (type === 'negative') setNegativePlaying(!negativePlaying);
  // };

  useEffect(() => {
    const handleAnimation = () => {
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    };

    // $FlowFixMe
    if (data && slideUp && (slideUp !== 0)) {
      handleAnimation();
    }
    // setPositivePlaying(false);
    // setNegativePlaying(false);

    return () => {
      // setPositivePlaying(false);
      // setNegativePlaying(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data && slideUp) slideUp.setValue(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* {locationInfo.isChords && data && (
        <View style={chords_style.soundButtonWrapper}>
          <TouchableHighlight
            onPress={() => handlePlay("positive", data.positive)}
            underlayColor={colors.blueTransparent}
            style={chords_style.soundButton}
          >
            <>
              <FontAwesomeIcon
                icon={positivePlaying ? faPause : faPlay}
                color={colors.white}
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text
                style={[
                  chords_style.soundButtonText,
                  {
                    fontSize: 18,
                  },
                ]}
              >
                {data.positive[0].note}
              </Text>
              <Text
                style={[
                  chords_style.soundButtonText,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                {data.positiveName}
              </Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => handlePlay("negative", data.negative)}
            underlayColor={colors.blueTransparent}
            style={chords_style.soundButton}
          >
            <>
              <FontAwesomeIcon
                icon={negativePlaying ? faPause : faPlay}
                color={colors.white}
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text
                style={[
                  chords_style.soundButtonText,
                  {
                    fontSize: 18,
                  },
                ]}
              >
                {handleNegativeChordNote(data.positiveName, data.negative)}
              </Text>
              <Text
                style={[
                  chords_style.soundButtonText,
                  {
                    fontSize: 12,
                  },
                ]}
              >
                {handleNegativeChordName(data.positiveName, data.negativeName)}
              </Text>
            </>
          </TouchableHighlight>
        </View>
      )} */}

      <View style={bottomStyle.space}>
        {locationInfo.isScales && data && (
          <Animated.View style={[bottomStyle.wrapper, animateBottom]}>
            <View style={[bottomStyle.scale, { alignItems: 'flex-end' }]}>
              {map(data.positive, (note, index) => (
                <Text
                  key={index}
                  style={[bottomStyle.scaleText, { color: colors.positiveText }]}
                >
                  {note}
                </Text>
              ))}
            </View>

            <View style={bottomStyle.axis} />

            <View style={[bottomStyle.scale, { alignItems: 'flex-start' }]}>
              {map(data.negative, (note, index) => (
                <Text
                  key={index}
                  style={[bottomStyle.scaleText, { color: colors.negativeText }]}
                >
                  {note}
                </Text>
              ))}
            </View>
            <View style={mainStyle.adSpace} />
          </Animated.View>
        )}
        {locationInfo.isChords && data && (
          <View style={bottomStyle.wrapper}>
            <View style={[bottomStyle.chord, { alignItems: 'flex-end' }]}>
              <View style={[bottomStyle.chordName, { alignItems: 'flex-end' }]}>
                <Text style={[bottomStyle.tonic, { color: colors.positiveText }]}>
                  {data.positive[0].note}
                </Text>
                <Text style={[bottomStyle.name, { color: colors.positiveText }]}>
                  {data.positiveName}
                </Text>
              </View>

              <View style={[bottomStyle.notes, { alignItems: 'flex-end' }]}>
                {map(data.positive, (chord, index) => (
                  <Text
                    key={index}
                    style={[
                      bottomStyle.notesText,
                      [
                        chord.diatonic
                          ? { color: colors.red }
                          : { color: colors.negativeText },
                      ],
                    ]}
                  >
                    {chord.note}
                  </Text>
                ))}
              </View>
            </View>

            <View style={bottomStyle.axis} />

            <View style={[bottomStyle.chord, { alignItems: 'flex-start' }]}>
              <View style={[bottomStyle.chordName, { alignItems: 'flex-start' }]}>
                <Text style={[bottomStyle.tonic, { color: colors.negativeText }]}>
                  {handleNegativeChordNote(data.positiveName, data.negative)}
                </Text>
                <Text
                  style={[
                    bottomStyle.name,
                    {
                      color:
                        data.positiveName === '5 chord'
                          ? colors.red
                          : colors.negativeText,
                    },
                  ]}
                >
                  {handleNegativeChordName(
                    data.positiveName,
                    data.negativeName,
                  )}
                </Text>
              </View>

              <View style={[bottomStyle.notes, { alignItems: 'flex-start' }]}>
                {map(data.negative, (chord, index) => (
                  <Text
                    key={index}
                    style={[
                      bottomStyle.notesText,
                      [
                        chord.diatonic
                          ? { color: colors.red }
                          : { color: colors.negativeText },
                      ],
                    ]}
                  >
                    {chord.note}
                  </Text>
                ))}
              </View>
            </View>
            <View style={mainStyle.adSpace} />
          </View>
        )}
      </View>
    </>
  );
}

export default Bottom;
