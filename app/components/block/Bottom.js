import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { includes } from "lodash";

import { useLocationInfo } from "../../utils";

import colors from "../../styles/colors";
import bottom from "../../styles/bottom_style";
import chords_style from "../../styles/chords_style";

const screenHeight = Dimensions.get("window").height;

const Bottom = (props) => {
  const locationInfo = useLocationInfo();
  const [positivePlaying, setPositivePlaying] = useState(false);
  const [negativePlaying, setNegativePlaying] = useState(false);
  const slideUp = useRef(new Animated.Value(screenHeight / 2)).current;
  const { data } = props;
  const animateBottom = {
    transform: [{ translateY: slideUp }],
  };

  const handleAnimation = () => {
    Animated.timing(slideUp, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const handleNegativeChordName = (positiveChord, negativeChord) => {
    if (positiveChord === "5 chord") return "-" + positiveChord;
    if (positiveChord === "dim7") return "13♭5sus";
    if (positiveChord === "7sus4") return "maj7♭5";

    return negativeChord;
  };

  const handleNegativeChordNote = (positiveChord, notesArray) => {
    if (includes(["m6", "6 chord", "dim7"], positiveChord)) {
      return notesArray[notesArray.length - 2].note;
    }

    return notesArray[notesArray.length - 1].note;
  };

  const handlePlay = (type, notesArray) => {
    if (type === "positive") setPositivePlaying(!positivePlaying);
    if (type === "negative") setNegativePlaying(!negativePlaying);
  };

  useEffect(() => {
    if (data && slideUp && slideUp !== 0) {
      handleAnimation();
    }
    setPositivePlaying(false);
    setNegativePlaying(false);

    return () => {
      setPositivePlaying(false);
      setNegativePlaying(false);
    };
  }, [data]);

  useEffect(() => {
    if (data && slideUp) slideUp.setValue(0);
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

      <View style={bottom.space}>
        {locationInfo.isScales && data && (
          <Animated.View style={[bottom.wrapper, animateBottom]}>
            <View style={[bottom.scale, { alignItems: "flex-end" }]}>
              {data.positive.map((note, index) => (
                <Text
                  key={index}
                  style={[bottom.scaleText, { color: colors.positiveText }]}
                >
                  {note}
                </Text>
              ))}
            </View>

            <View style={bottom.axis} />

            <View style={[bottom.scale, { alignItems: "flex-start" }]}>
              {data.negative.map((note, index) => (
                <Text
                  key={index}
                  style={[bottom.scaleText, { color: colors.negativeText }]}
                >
                  {note}
                </Text>
              ))}
            </View>
          </Animated.View>
        )}
        {locationInfo.isChords && data && (
          <View style={bottom.wrapper}>
            <View style={[bottom.chord, { alignItems: "flex-end" }]}>
              <View style={[bottom.chordName, { alignItems: "flex-end" }]}>
                <Text style={[bottom.tonic, { color: colors.positiveText }]}>
                  {data.positive[0].note}
                </Text>
                <Text style={[bottom.name, { color: colors.positiveText }]}>
                  {data.positiveName}
                </Text>
              </View>

              <View style={[bottom.notes, { alignItems: "flex-end" }]}>
                {data.positive.map((chord, index) => (
                  <Text
                    key={index}
                    style={[
                      bottom.notesText,
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

            <View style={bottom.axis} />

            <View style={[bottom.chord, { alignItems: "flex-start" }]}>
              <View style={[bottom.chordName, { alignItems: "flex-start" }]}>
                <Text style={[bottom.tonic, { color: colors.negativeText }]}>
                  {handleNegativeChordNote(data.positiveName, data.negative)}
                </Text>
                <Text
                  style={[
                    bottom.name,
                    {
                      color:
                        data.positiveName === "5 chord"
                          ? colors.red
                          : colors.negativeText,
                    },
                  ]}
                >
                  {handleNegativeChordName(
                    data.positiveName,
                    data.negativeName
                  )}
                </Text>
              </View>

              <View style={[bottom.notes, { alignItems: "flex-start" }]}>
                {data.negative.map((chord, index) => (
                  <Text
                    key={index}
                    style={[
                      bottom.notesText,
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
          </View>
        )}
      </View>
    </>
  );
};

export default React.memo(Bottom);
