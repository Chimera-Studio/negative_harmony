import React from "react";
import { Animated, Text, View } from "react-native";

import { useLocationInfo } from "../utils";

import colors from "../styles/colors";
import bottom from "../styles/bottom_styles";

const Bottom = (props) => {
  const locationInfo = useLocationInfo();
  const animateBottom = {
    transform: [{ translateY: 0 }],
  };

  return (
    <View style={bottom.space}>
      {locationInfo.isScales && props.scales && (
        <Animated.View style={[bottom.wrapper, animateBottom]}>
          <View style={[bottom.scale, { alignItems: "flex-end" }]}>
            {props.scales.positive.map((note, index) => (
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
            {props.scales.negative.map((note, index) => (
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
      {locationInfo.isChords && props.chords && (
        <View style={bottom.wrapper}>
          <View style={[bottom.chord, { alignItems: "flex-end" }]}>
            <View style={[bottom.chordName, { alignItems: "flex-end" }]}>
              <Text style={[bottom.tonic, { color: colors.positiveText }]}>
                {props.tonic.positive}
              </Text>
              <Text style={[bottom.name, { color: colors.positiveText }]}>
                {props.chord.positive}
              </Text>
            </View>

            <View style={[bottom.notes, { alignItems: "flex-end" }]}>
              {props.chords.positive.map((chord, index) => (
                <Text
                  key={index}
                  style={
                    (bottom.notesText,
                    [
                      chord.diatonic
                        ? { color: colors.red }
                        : { color: colors.negativeText },
                    ])
                  }
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
                {props.tonic.negative}
              </Text>
              <Text style={[bottom.name, { color: colors.negativeText }]}>
                {props.chord.negative}
              </Text>
            </View>

            <View style={[bottom.notes, { alignItems: "flex-start" }]}>
              {props.chords.negative.map((chord, index) => (
                <Text
                  key={index}
                  style={
                    (bottom.notesText,
                    [
                      chord.diatonic
                        ? { color: colors.red }
                        : { color: colors.negativeText },
                    ])
                  }
                >
                  {chord.note}
                </Text>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Bottom;
