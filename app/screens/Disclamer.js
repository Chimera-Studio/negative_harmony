import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

import colors from "../styles/colors";
import styles from "../styles/styles";

const Disclamer = () => {
  const disclamerClose = () => {
    if (chordsUnlocked == false) {
      showInitialScales();
      showInitialChords();
    } else {
      visibleScales = true;
      chordsUnlocked = true;
      showInitialScales();
      showInitialChords();
    }
  };

  return (
    <View style={styles.disclamerWrapper}>
      <TouchableOpacity style={styles.exit} onPress={disclamerClose}>
        <Exit />
      </TouchableOpacity>
      <Text style={styles.discTitle}>Information</Text>
      <View style={styles.discTextWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.discText}>
            The notes in the chords coloured{" "}
            <Text
              style={{
                fontFamily: "NegativeHarmonyBold",
                color: colors.red,
              }}
            >
              RED
            </Text>{" "}
            indicate that they are non-diatonic notes. {"\n"}
            {"\n"}(Non-Diatonic refers to any notes or chords that are not
            native to the key){"\n"}
            {"\n"}This does not mean that the chord cannot be used in that
            key/scale but that its sound is more complex and will not fit with
            the other chords as easily.
          </Text>
          <Text style={styles.discSubTitle}>Disclaimer</Text>
          <Text style={styles.discText}>
            The negative chord names may not always be exactly right because of
            the way the chord naming system works. {"\n"}
            {"\n"}In practise the chord name comes from the tonic/root note
            followed by the structure/pattern (major, minor, suspended...) this
            rule is broken when looking at negative chords where the tonic/root
            is actually the last note played going from left to right on the
            piano. {"\n"}
            {"\n"}Because of this, the app looks if the negative chord pattern
            has a match when mirrored and compared to the regular one. If so it
            determines the chord name by taking the "negative" tonic/root note
            and displaying the chord name. {"\n"}
            {"\n"}Though the chord name may vary depending on what you consider
            to be the tonic/root note the notes displayed in the negative chords
            are always correct.
          </Text>
          <Text style={styles.discContactTitle}>Contact</Text>
          <Text style={styles.discText}>
            If you find any bugs incorrect representations of the notes or
            chords, please contact us at:{"\n"}
            <Text style={{ color: colors.blue }}>
              chimerastudiotm@gmail.com
            </Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Disclamer;
