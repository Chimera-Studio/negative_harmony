import React, { useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from "react-native";
import isEqual from "lodash.isequal";
import times from "lodash/times";

import ListArrow from "../assets/img/arrow.svg";
import Bottom from "../elements/Bottom";

import { eng } from "../locales";
import { chordList, chords } from "../utils/patterns";

import colors from "../styles/colors";
import styles from "../styles/styles";

let selectedTonicIndex = 0;
let cloneChords = [];
let cloneNegativeChords = [];
let positiveChord = [];
let negativeChord = [];
let negativeTonic = null;
let negativeChordVal = null;

function showInitialChords(name) {
  name = props.scales.positive[0];
  selectedChordVal = chordList[0].value;

  for (let i = 0; i < props.scales.positive.length; i++) {
    if (name == props.scales.positive[i]) {
      selectedTonicIndex = i;
    }
  }

  cloneChords = props.scales.positive.slice();

  for (let i = 0; i < selectedTonicIndex; i++)
    cloneChords.push(cloneChords.shift());

  cloneNegativeChords = props.scales.negative.slice();
  for (let i = 0; i < selectedTonicIndex; i++)
    cloneNegativeChords.push(cloneNegativeChords.shift());

  handleChords();
}

function diatonicDetection() {
  for (let n = 0; n < positiveChord.length; n++) {
    let checkDiatonic = positiveChord[n].note;
    for (let i = 0; i < positiveScale.length; i++) {
      let scaleNote = positiveScale[i];
      if (checkDiatonic == scaleNote) {
        positiveChord[n].diatonic = false;
      }
    }
  }
  for (let n = 0; n < negativeChord.length; n++) {
    let checkDiatonic = negativeChord[n].note;
    for (let i = 0; i < negativeScale.length; i++) {
      let scaleNote = negativeScale[i];
      if (checkDiatonic == scaleNote) {
        negativeChord[n].diatonic = false;
      }
    }
  }
}

const Chords = (props) => {
  const [chord, setChord] = useState(chordList[0]);
  const [tonicSpacer, setTonicSpacer] = useState(0);
  const [legendStatus, setLegendStatus] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollChords = useRef(null);

  const getDimentions = (event) => {
    const { width } = event.nativeEvent.layout;
    setTonicSpacer(width / 2 - 55);
  };

  const handleSelect = (chord) => {
    setChord(chord);
    // handleChords();
    setOpenSelect(false);
  };

  const handleChords = () => {
    positiveChord = [];
    negativeChord = [];

    times(chord.value.length, (i) => {
      const obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[chord.value[i]];
      positiveChord.push(obj);

      const objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[chord.value[i]];
      negativeChord.push(objNeg);
    });

    /*
    if (selectedChordVal == "major") {
      for (let i = 0; i < majorChord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[majorChord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[majorChord[i]];
        negativeChord.push(objNeg);
      }
    } else if (selectedChordVal == "minor") {
      for (let i = 0; i < minorChord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[minorChord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[minorChord[i]];
        negativeChord.push(objNeg);
      }
    } else if (selectedChordVal == "major7") {
      for (let i = 0; i < major7Chord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[major7Chord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[major7Chord[i]];
        negativeChord.push(objNeg);
      }
    } else if (selectedChordVal == "minor7") {
      for (let i = 0; i < minor7Chord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[minor7Chord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[minor7Chord[i]];
        negativeChord.push(objNeg);
      }
    } else if (selectedChordVal == "m7b5") {
      for (let i = 0; i < m7b5Chord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[m7b5Chord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[m7b5Chord[i]];
        negativeChord.push(objNeg);
      }
    } else if (selectedChordVal == "maj9") {
      for (let i = 0; i < maj9Chord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[maj9Chord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[maj9Chord[i]];
        negativeChord.push(objNeg);
      }
    } else if (selectedChordVal == "m6") {
      for (let i = 0; i < m6Chord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[m6Chord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[m6Chord[i]];
        negativeChord.push(objNeg);
      }
    } else if (selectedChordVal == "sus2") {
      for (let i = 0; i < sus2Chord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[sus2Chord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[sus2Chord[i]];
        negativeChord.push(objNeg);
      }
    } else if (selectedChordVal == "sus4") {
      for (let i = 0; i < sus4Chord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[sus4Chord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[sus4Chord[i]];
        negativeChord.push(objNeg);
      }
    } else if (selectedChordVal == "dim") {
      for (let i = 0; i < dimChord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[dimChord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[dimChord[i]];
        negativeChord.push(objNeg);
      }
    } else if (selectedChordVal == "aug") {
      for (let i = 0; i < augChord.length; i++) {
        let obj = {};
        obj["diatonic"] = true;
        obj["note"] = cloneChords[augChord[i]];
        positiveChord.push(obj);
        let objNeg = {};
        objNeg["diatonic"] = true;
        objNeg["note"] = cloneNegativeChords[augChord[i]];
        negativeChord.push(objNeg);
      }
    }
    */

    if (chord.name == "Minor 6") {
      negativeTonic = negativeChord[negativeChord.length - 2].note;
    } else {
      negativeTonic = negativeChord[negativeChord.length - 1].note;
    }

    let negativeChordPattern = [];
    for (let n = 0; n < negativeChord.length; n++) {
      let checkChordNote = negativeChord[n].note;
      for (let i = 0; i < props.scales.positive.length; i++) {
        let tonicVal = i;
        let tonicNote = props.scales.positive[i];
        if (checkChordNote == tonicNote) {
          negativeChordPattern.push(parseInt(tonicVal));
        }
      }
    }

    for (let i = 0; i < negativeChordPattern.length; i++) {
      let subtractor = negativeChordPattern[negativeChordPattern.length - 1];
      let noteValReset = negativeChordPattern[i] - subtractor;
      if (noteValReset <= -1) {
        let newNoteValReset = 12 - Math.abs(noteValReset);
        negativeChordPattern[i] = parseInt(newNoteValReset);
      } else if (noteValReset == 0) {
        negativeChordPattern[i] = parseInt("0");
      } else {
        let newVal = negativeChordPattern[i] - subtractor;
        negativeChordPattern[i] = parseInt(newVal);
      }
    }

    negativeChordPattern.reverse();
    if (isEqual(chords.major, negativeChordPattern)) {
      negativeChordVal = "major";
    } else if (isEqual(chords.minor, negativeChordPattern)) {
      negativeChordVal = "minor";
    } else if (isEqual(chords.major7, negativeChordPattern)) {
      negativeChordVal = "major7";
    } else if (isEqual(chords.minor7, negativeChordPattern)) {
      negativeChordVal = "minor7";
    } else if (isEqual(chords.m7flat5, negativeChordPattern)) {
      negativeChordVal = "m7♭5";
    } else if (isEqual(chords.major9, negativeChordPattern)) {
      negativeChordVal = "maj9";
    } else if (isEqual(chords.minor9, negativeChordPattern)) {
      negativeChordVal = "m9";
    } else if (isEqual(chords.minor6, negativeChordPattern)) {
      negativeChordVal = "m6";
    } else if (isEqual(chords.sus2, negativeChordPattern)) {
      negativeChordVal = "sus2";
    } else if (isEqual(chords.sus4, negativeChordPattern)) {
      negativeChordVal = "sus4";
    } else if (isEqual(chords.dim, negativeChordPattern)) {
      negativeChordVal = "dim";
    } else if (isEqual(chords.aug, negativeChordPattern)) {
      negativeChordVal = "aug";
    } else if (isEqual(chords.dominant7, negativeChordPattern)) {
      negativeChordVal = "7";
    } else if (isEqual(chords.m6Neg, negativeChordPattern)) {
      negativeChordVal = "7";
    } else if (isEqual(chords.diminished7, negativeChordPattern)) {
      negativeChordVal = "dim7";
    } else if (isEqual(chords.dom7sus4, negativeChordPattern)) {
      negativeChordVal = "7sus4";
    } else if (isEqual(chords.chord5, negativeChordPattern)) {
      negativeChordVal = "5Chord";
    } else if (isEqual(chords.chord6, negativeChordPattern)) {
      negativeChordVal = "6Chord";
    } else {
      negativeChordVal = "???";
    }

    // diatonicDetection();
  };

  const handleTonic = (name, index) => {
    setSelectedIndex(index);
    let offsetInterval = 110 * index;
    scrollChords.current.scrollTo({
      x: offsetInterval,
      animated: false,
    });

    for (let i = 0; i < props.scales.positive.length; i++) {
      if (name == props.scales.positive[i]) {
        selectedTonicIndex = i;
      }
    }

    cloneChords = props.scales.positive.slice();

    for (let i = 0; i < selectedTonicIndex; i++)
      cloneChords.push(cloneChords.shift());

    cloneNegativeChords = props.scales.negative.slice();
    for (let i = 0; i < selectedTonicIndex; i++)
      cloneNegativeChords.push(cloneNegativeChords.shift());

    handleChords();
    // props.review();
  };

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.selectChordsWrapper}>
        <Text style={styles.selectTextExp}>{eng.select.chords}</Text>

        <View style={styles.selectedScaleNameWrapper}>
          <Text style={styles.selectedScaleKey}>
            {props.scales.positive[0]}
          </Text>
          <Text style={styles.selectedScaleName}>
            {props.selectedScale.name}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.selectInput}
          disabled={legendStatus}
          onPress={() => setOpenSelect(true)}
        >
          <Text style={styles.selectInputText}>{chord.name}</Text>
          <ListArrow style={styles.selectListArrow} />
        </TouchableOpacity>
      </View>

      <View style={styles.chordsWrapper} onLayout={getDimentions}>
        {props.chordsUnlocked ? (
          <View style={styles.scrollChords}>
            <Text style={styles.scrollChordsExpText}>{eng.select.tonics}</Text>

            <ScrollView
              ref={scrollChords}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollChordsWrapper}
            >
              <View
                style={(styles.scrollChordsSpace, { width: tonicSpacer })}
              />
              {props.scales.positive.map((note, index) => (
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={colors.lightBlue}
                  style={
                    index == selectedIndex
                      ? styles.scrollChordsNoteSelected
                      : styles.scrollChordsNote
                  }
                  key={index}
                  onPress={() => handleTonic(note, index)}
                >
                  <Text
                    style={
                      index == selectedIndex
                        ? styles.scrollChordsNoteTextSelected
                        : styles.scrollChordsNoteText
                    }
                  >
                    {note}
                  </Text>
                </TouchableHighlight>
              ))}
              <View
                style={(styles.scrollChordsSpace, { width: tonicSpacer })}
              />
            </ScrollView>
          </View>
        ) : (
          <TouchableHighlight style={styles.rewardedOpen}>
            <Text style={styles.rewardedOpenText}>{eng.cta.chords}</Text>
          </TouchableHighlight>
        )}
      </View>

      {/* <Bottom /> */}

      <Modal animationType="fade" transparent={true} visible={openSelect}>
        <View style={styles.selectListShadow}>
          <View style={styles.selectListWrapper}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.selectList}
              centerContent={true}
            >
              {chordList.map((chord, index) => (
                <TouchableOpacity
                  key={chord.name}
                  style={
                    index === chordList.length - 1
                      ? styles.selectItemNoBorder
                      : styles.selectItem
                  }
                  onPress={
                    props.chordsUnlocked
                      ? () => handleSelect(chord)
                      : index == 0
                      ? () => handleSelect(chord)
                      : null
                  }
                >
                  <Text
                    style={
                      props.chordsUnlocked
                        ? styles.selectText
                        : index == 0
                        ? styles.selectText
                        : styles.selectDisabledText
                    }
                  >
                    {chord.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Chords;
