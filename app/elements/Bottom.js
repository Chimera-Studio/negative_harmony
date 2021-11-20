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
      {locationInfo.isScales && props.data && (
        <Animated.View style={[bottom.wrapper, animateBottom]}>
          <View style={[bottom.scale, { alignItems: "flex-end" }]}>
            {props.data.positive.map((note, index) => (
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
            {props.data.negative.map((note, index) => (
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
      {locationInfo.isChords && props.data && (
        <View style={bottom.wrapper}>
          <View style={[bottom.chord, { alignItems: "flex-end" }]}>
            <View style={[bottom.chordName, { alignItems: "flex-end" }]}>
              <Text style={[bottom.tonic, { color: colors.positiveText }]}>
                {props.data.positive[0].note}
              </Text>
              <Text style={[bottom.name, { color: colors.positiveText }]}>
                {props.data.positiveName}
              </Text>
            </View>

            <View style={[bottom.notes, { alignItems: "flex-end" }]}>
              {props.data.positive.map((chord, index) => (
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
                {props.data.negative[props.data.negative.length - 1].note}
              </Text>
              <Text style={[bottom.name, { color: colors.negativeText }]}>
                {props.data.negativeName}
              </Text>
            </View>

            <View style={[bottom.notes, { alignItems: "flex-start" }]}>
              {props.data.negative.map((chord, index) => (
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
  );
};

export default React.memo(Bottom);
