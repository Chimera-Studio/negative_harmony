import React from "react";
import { Text, View, Animated } from "react-native";

import styles from "../styles/styles";

const Bottom = (type) => {
  return (
    <View>
      {props.type === "scales" ? (
        <Animated.View style={[styles.scaleWrapper, slideUp]}>
          <View style={styles.positiveScale}>
            {positiveScale.map((note, index) => (
              <Text style={styles.positiveScaleText} key={index}>
                {note}
              </Text>
            ))}
          </View>
          <View style={styles.axisLegend} />
          <View style={styles.negativeScale}>
            {negativeScale.map((note, index) => (
              <Text style={styles.negativeScaleText} key={index}>
                {note}
              </Text>
            ))}
          </View>
        </Animated.View>
      ) : (
        <View style={styles.chordWrapper}>
          <View style={styles.positiveChord}>
            <View style={styles.positiveChordNameWrapper}>
              <Text style={styles.positiveChordTonic}>{selectedTonic}</Text>
              <Text style={styles.positiveChordName}>{selectedChordVal}</Text>
            </View>

            <View style={styles.positiveChordNotes}>
              {positiveChord.map((chordNote, index) => (
                <Text
                  style={
                    chordNote.diatonic
                      ? styles.diatonicChordText
                      : styles.positiveChordText
                  }
                  key={index}
                >
                  {chordNote.note}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.axisLegend} />

          <View style={styles.negativeChord}>
            <View style={styles.negativeChordNameWrapper}>
              <Text style={styles.negativeChordTonic}>{negativeTonic}</Text>
              <Text style={styles.negativeChordName}>{negativeChordVal}</Text>
            </View>

            <View style={styles.negativeChordNotes}>
              {negativeChord.map((chordNote, index) => (
                <Text
                  style={
                    chordNote.diatonic
                      ? styles.diatonicChordText
                      : styles.negativeChordText
                  }
                  key={index}
                >
                  {chordNote.note}
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
