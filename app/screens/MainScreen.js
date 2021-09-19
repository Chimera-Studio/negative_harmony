import { StatusBar } from "expo-status-bar";
import React, {
  Component,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Modal,
  Easing,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import { Svg, Circle, Path, Polygon, G } from "react-native-svg";
import {
  AdMobBanner,
  AdMobRewarded,
  requestPermissionsAsync,
  getPermissionsAsync,
} from "expo-ads-admob";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../config/styles";
import colors from "../config/colors";
import admob from "../tokens";

import GradientBG from "../screens/GradientBG";
import WhiteBG from "../screens/WhiteBG";

import Info from "../assets/img/info.svg";
import Legend from "../assets/img/legend.svg";
import Legend2 from "../assets/img/legend2Exp.svg";
import Disclamer from "../assets/img/disclamer.svg";
import ListArrow from "../assets/img/arrow.svg";
import Icon from "../assets/img/icon.svg";

var selectedScaleNameSaved = "Major";
var selectedScaleValSaved = "major";
var selectedScaleKeySaved = "C";
var selectedScaleDisplaySaved = "major";

var axisStatusSaved = false;
var axisDegSaved = "0deg";

var activeKeyXSaved = 0;
var activeKeyYSaved = 0;
var activeKeyGroupSaved = 0;
var activeKeyFieldSaved = 0;

var selectedTonic;
var selectedTonicIndex;
var selectedChordVal;
var negativeTonic;
var negativeChordVal;

var visibleScales = false;
var chordsUnlocked = false;
var personalisedAds = false;

var scaleList = [
  { name: "Major", value: "major" },
  { name: "Natural Minor", value: "naturalMinor" },
  { name: "Harmonic Minor", value: "harmonicMinor" },
  { name: "Melodic Minor", value: "melodicMinor" },
  { name: "Chromatic", value: "chromatic" },
  { name: "Whole Tone", value: "wholeTone" },
  { name: "Major Pentatonic", value: "majorPentatonic" },
  { name: "Minor Pentatonic", value: "minorPentatonic" },
  { name: "Ionian", value: "ionian" },
  { name: "Dorian", value: "dorian" },
  { name: "Phrygian", value: "phrygian" },
  { name: "Lydian", value: "lydian" },
  { name: "Mixolydian", value: "mixolydian" },
  { name: "Aeolian", value: "aeolian" },
  { name: "Locrian", value: "locrian" },
];

var chordList = [
  { name: "Major", value: "major" },
  { name: "Minor", value: "minor" },
  { name: "Major 7", value: "major7" },
  { name: "Minor 7", value: "minor7" },
  { name: "Minor 7♭ 5", value: "m7b5" },
  { name: "Major 9", value: "maj9" },
  { name: "Minor 6", value: "m6" },
  { name: "Suspended 2", value: "sus2" },
  { name: "Suspended 4", value: "sus4" },
  { name: "Diminished", value: "dim" },
  { name: "Augmented", value: "aug" },
];

var musicScale = [
  "C",
  "C♯ D♭",
  "D",
  "D♯ E♭",
  "E",
  "F",
  "F♯ G♭",
  "G",
  "G♯ A♭",
  "A",
  "A♯ B♭",
  "B",
];
var cloneScale = [];
var cloneNegativeScale = [];
var positiveScale = [];
var negativeScale = [];

var cloneChords = [];
var cloneNegativeChords = [];
var positiveScaleTonics = [];
var positiveChord = [];
var negativeChord = [];

var majorScale = [0, 2, 4, 5, 7, 9, 11, 0];
/* majorScale Pattern: R + 2 + 2 + 1 + 2 + 2 + 2 + R */

var naturalMinorScale = [0, 2, 3, 5, 7, 8, 10, 0];
/* naturalMinorScale Pattern: R + 2 + 1 + 2 + 2 + 1 + 2 + R */

var harmonicMinorScale = [0, 2, 3, 5, 7, 8, 11, 0];
/* harmonicMinorScale Pattern: R + 2 + 1 + 2 + 2 + 1 + 3 + R */

var melodicMinorScale = [0, 2, 3, 5, 7, 9, 11, 0];
/* melodicMinorScale Pattern: R + 2 + 1 + 2 + 2 + 2 + 2 + R */

var chromaticScale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
/* chromaticScale Pattern: R + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + R */

var wholeToneScale = [0, 2, 4, 6, 8, 10, 0];
/* wholeToneScale Pattern: R + 2 + 2 + 2 + 2 + 2 + R */

var majorPentatonicScale = [0, 2, 4, 7, 9, 0];
/* majorPentatonicScale Pattern: R + 2 + 2 + 3 + 2 + R */

var minorPentatonicScale = [0, 3, 5, 7, 10, 0];
/* minorPentatonicScale Pattern: R + 3 + 2 + 2 + 3 + R */

var ionianScale = [0, 2, 4, 5, 7, 9, 11, 0];
/* ionianScale Pattern: R + 2 + 2 + 1 + 2 + 2 + 2 + R */

var dorianScale = [0, 2, 3, 5, 7, 9, 10, 0];
/* dorianScale Pattern: R + 2 + 1 + 2 + 2 + 2 + 1 + R */

var phrygianScale = [0, 1, 3, 5, 7, 8, 10, 0];
/* phrygianScale Pattern: R + 1 + 2 + 2 + 2 + 1 + 2 + R */

var lydianScale = [0, 2, 4, 6, 7, 9, 11, 0];
/* lydianScale Pattern: R + 2 + 2 + 2 + 1 + 2 + 2 + R */

var mixolydianScale = [0, 2, 4, 5, 7, 9, 10, 0];
/* mixolydianScale Pattern: R + 2 + 2 + 1 + 2 + 2 + 1 + R */

var aeolianScale = [0, 2, 3, 5, 7, 8, 10, 0];
/* aeolianScale Pattern: R + 2 + 1 + 2 + 2 + 1 + 2 + R */

var locrianScale = [0, 1, 3, 5, 6, 8, 10, 0];
/* locrianScale Pattern: R + 1 + 2 + 2 + 1 + 2 + 2 + R */

/* ----------------------------------------------------- */

var majorChord = [0, 4, 7];
/* majorChord Pattern: 0, 4, 1 */

var minorChord = [0, 3, 7];
/* minorChord Pattern: 0, 9, 1 */

var major7Chord = [0, 4, 7, 11];
/* major7Chord Pattern: 0, 4, 1, 5 */

var minor7Chord = [0, 3, 7, 10];
/* minor7Chord Pattern: 0, 9, 1, 10 */

var m7b5Chord = [0, 3, 6, 10];
/* m7b5Chord Pattern: 0, 9, 6, 10 */

var maj9Chord = [0, 4, 7, 11, 2];
/* maj9Chord Pattern: 0, 4, 1, 5, 2 */

var m9Chord = [0, 3, 7, 10, 2];
/* m9Chord Pattern: 0, 4, 1, 5, 2 */

var m6Chord = [0, 3, 7, 9];
/* m6Chord Pattern: 0, 9, 1, 3 */

var sus2Chord = [0, 2, 7];
/* sus2Chord Pattern: 0, 2, 1 */

var sus4Chord = [0, 5, 7];
/* sus4Chord Pattern: 0, 11, 1 */

var dimChord = [0, 3, 6];
/* dimChord Pattern: 0, 9, 6 */

var augChord = [0, 4, 8];
/* augChord Pattern: 0, 4, 8 */

var chords5Chord = [0, 7, 0];
/* 5ChordsChord Pattern: 0, 1, 0 */

var chords6Chord = [0, 4, 7, 9];
/* 6ChordsChord Pattern: 0, 4, 1, 3 */

var dominant7Chord = [0, 4, 7, 10];
/* dominant7Chord Pattern: 0, 4, 1, 10 */

var diminished7Chord = [0, 9, 6, 8];
/* diminished7Chord Pattern: 0, 3, 6, 8 */

var dom7sus4Chord = [0, 5, 7, 11];
/* dominant9Chord Pattern: 0, 11, 1, 5 */

var m6NegChord = [0, 2, 6, 9];
/* m6NegChord Pattern: 0, 2, 6, 3 */

/*
var dominant9Chord = [0, 4, 1, 10, 2];
dominant9Chord Pattern: 0, 4, 7, 10, 2 */

/*
var dominant11Chord = [0, 4, 1, 10, 2, 5];
dominant11Chord Pattern: 0, 4, 7, 10, 2, 11 */

/*
var dominant13Chord = [0, 4, 1, 10, 2, 5, 0];
dominant13Chord Pattern: 0, 4, 7, 10, 2, 11, 0 */

/* ----------------------------------------------------- */

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function showInitialScales() {
  cloneScale = musicScale.slice();

  let rootNote = activeKeyFieldSaved;
  for (let i = 0; i < rootNote; i++) cloneScale.push(cloneScale.shift());

  cloneNegativeScale = cloneScale.slice();

  for (let n = 0; n < 8; n++)
    cloneNegativeScale.push(cloneNegativeScale.shift());
  cloneNegativeScale.reverse();

  selectedScaleKeySaved = cloneScale[0];
  showScales();
}

function showScales() {
  positiveScale = [];
  negativeScale = [];

  let pattern = 0;

  if (selectedScaleValSaved == "major") {
    for (let i = 0; i < majorScale.length; i++) {
      positiveScale.push(cloneScale[majorScale[pattern]]);
      negativeScale.push(cloneNegativeScale[majorScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "naturalMinor") {
    for (let i = 0; i < naturalMinorScale.length; i++) {
      positiveScale.push(cloneScale[naturalMinorScale[pattern]]);
      negativeScale.push(cloneNegativeScale[naturalMinorScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "harmonicMinor") {
    for (let i = 0; i < harmonicMinorScale.length; i++) {
      positiveScale.push(cloneScale[harmonicMinorScale[pattern]]);
      negativeScale.push(cloneNegativeScale[harmonicMinorScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "melodicMinor") {
    for (let i = 0; i < melodicMinorScale.length; i++) {
      positiveScale.push(cloneScale[melodicMinorScale[pattern]]);
      negativeScale.push(cloneNegativeScale[melodicMinorScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "chromatic") {
    for (let i = 0; i < chromaticScale.length; i++) {
      positiveScale.push(cloneScale[chromaticScale[pattern]]);
      negativeScale.push(cloneNegativeScale[chromaticScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "wholeTone") {
    for (let i = 0; i < wholeToneScale.length; i++) {
      positiveScale.push(cloneScale[wholeToneScale[pattern]]);
      negativeScale.push(cloneNegativeScale[wholeToneScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "majorPentatonic") {
    for (let i = 0; i < majorPentatonicScale.length; i++) {
      positiveScale.push(cloneScale[majorPentatonicScale[pattern]]);
      negativeScale.push(cloneNegativeScale[majorPentatonicScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "minorPentatonic") {
    for (let i = 0; i < minorPentatonicScale.length; i++) {
      positiveScale.push(cloneScale[minorPentatonicScale[pattern]]);
      negativeScale.push(cloneNegativeScale[minorPentatonicScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "ionian") {
    for (let i = 0; i < ionianScale.length; i++) {
      positiveScale.push(cloneScale[ionianScale[pattern]]);
      negativeScale.push(cloneNegativeScale[ionianScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "dorian") {
    for (let i = 0; i < dorianScale.length; i++) {
      positiveScale.push(cloneScale[dorianScale[pattern]]);
      negativeScale.push(cloneNegativeScale[dorianScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "phrygian") {
    for (let i = 0; i < phrygianScale.length; i++) {
      positiveScale.push(cloneScale[phrygianScale[pattern]]);
      negativeScale.push(cloneNegativeScale[phrygianScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "lydian") {
    for (let i = 0; i < lydianScale.length; i++) {
      positiveScale.push(cloneScale[lydianScale[pattern]]);
      negativeScale.push(cloneNegativeScale[lydianScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "mixolydian") {
    for (let i = 0; i < mixolydianScale.length; i++) {
      positiveScale.push(cloneScale[mixolydianScale[pattern]]);
      negativeScale.push(cloneNegativeScale[mixolydianScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "aeolian") {
    for (let i = 0; i < aeolianScale.length; i++) {
      positiveScale.push(cloneScale[aeolianScale[pattern]]);
      negativeScale.push(cloneNegativeScale[aeolianScale[pattern]]);
      pattern++;
    }
  } else if (selectedScaleValSaved == "locrian") {
    for (let i = 0; i < locrianScale.length; i++) {
      positiveScale.push(cloneScale[locrianScale[pattern]]);
      negativeScale.push(cloneNegativeScale[locrianScale[pattern]]);
      pattern++;
    }
  }

  positiveScaleTonics = positiveScale.slice();
  positiveScaleTonics.splice(-1, 1);
}

function showInitialChords() {
  selectedTonic = cloneScale[0];
  selectedChordVal = chordList[0].value;

  for (let i = 0; i < cloneScale.length; i++) {
    if (selectedTonic == cloneScale[i]) {
      selectedTonicIndex = i;
    }
  }

  cloneChords = cloneScale.slice();

  var rootNote = selectedTonicIndex;
  for (var i = 0; i < rootNote; i++) cloneChords.push(cloneChords.shift());

  cloneNegativeChords = cloneNegativeScale.slice();
  for (var i = 0; i < rootNote; i++)
    cloneNegativeChords.push(cloneNegativeChords.shift());

  showChords();
}

function showChords() {
  positiveChord = [];
  negativeChord = [];

  let pattern = 0;

  if (selectedChordVal == "major") {
    for (let i = 0; i < majorChord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[majorChord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[majorChord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  } else if (selectedChordVal == "minor") {
    for (let i = 0; i < minorChord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[minorChord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[minorChord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  } else if (selectedChordVal == "major7") {
    for (let i = 0; i < major7Chord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[major7Chord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[major7Chord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  } else if (selectedChordVal == "minor7") {
    for (let i = 0; i < minor7Chord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[minor7Chord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[minor7Chord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  } else if (selectedChordVal == "m7b5") {
    for (let i = 0; i < m7b5Chord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[m7b5Chord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[m7b5Chord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  } else if (selectedChordVal == "maj9") {
    for (let i = 0; i < maj9Chord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[maj9Chord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[maj9Chord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  } else if (selectedChordVal == "m6") {
    for (let i = 0; i < m6Chord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[m6Chord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[m6Chord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  } else if (selectedChordVal == "sus2") {
    for (let i = 0; i < sus2Chord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[sus2Chord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[sus2Chord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  } else if (selectedChordVal == "sus4") {
    for (let i = 0; i < sus4Chord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[sus4Chord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[sus4Chord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  } else if (selectedChordVal == "dim") {
    for (let i = 0; i < dimChord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[dimChord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[dimChord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  } else if (selectedChordVal == "aug") {
    for (let i = 0; i < augChord.length; i++) {
      var obj = {};
      obj["diatonic"] = true;
      obj["note"] = cloneChords[augChord[pattern]];
      positiveChord.push(obj);
      var objNeg = {};
      objNeg["diatonic"] = true;
      objNeg["note"] = cloneNegativeChords[augChord[pattern]];
      negativeChord.push(objNeg);
      pattern++;
    }
  }

  if (selectedChordVal == "m6") {
    negativeTonic = negativeChord[negativeChord.length - 2].note;
  } else {
    negativeTonic = negativeChord[negativeChord.length - 1].note;
  }

  var negativeChordPattern = [];
  for (let n = 0; n < negativeChord.length; n++) {
    var checkChordNote = negativeChord[n].note;
    for (let i = 0; i < cloneScale.length; i++) {
      var tonicVal = i;
      var tonicNote = cloneScale[i];
      if (checkChordNote == tonicNote) {
        negativeChordPattern.push(parseInt(tonicVal));
      }
    }
  }

  for (var i = 0; i < negativeChordPattern.length; i++) {
    var subtractor = negativeChordPattern[negativeChordPattern.length - 1];
    var noteValReset = negativeChordPattern[i] - subtractor;
    if (noteValReset <= -1) {
      var newNoteValReset = 12 - Math.abs(noteValReset);
      negativeChordPattern[i] = parseInt(newNoteValReset);
    } else if (noteValReset == 0) {
      negativeChordPattern[i] = parseInt("0");
    } else {
      var newVal = negativeChordPattern[i] - subtractor;
      negativeChordPattern[i] = parseInt(newVal);
    }
  }

  negativeChordPattern.reverse();
  if (arrayEquals(majorChord, negativeChordPattern)) {
    negativeChordVal = "major";
  } else if (arrayEquals(minorChord, negativeChordPattern)) {
    negativeChordVal = "minor";
  } else if (arrayEquals(major7Chord, negativeChordPattern)) {
    negativeChordVal = "major7";
  } else if (arrayEquals(minor7Chord, negativeChordPattern)) {
    negativeChordVal = "minor7";
  } else if (arrayEquals(m7b5Chord, negativeChordPattern)) {
    negativeChordVal = "m7♭5";
  } else if (arrayEquals(maj9Chord, negativeChordPattern)) {
    negativeChordVal = "maj9";
  } else if (arrayEquals(m9Chord, negativeChordPattern)) {
    negativeChordVal = "m9";
  } else if (arrayEquals(m6Chord, negativeChordPattern)) {
    negativeChordVal = "m6";
  } else if (arrayEquals(sus2Chord, negativeChordPattern)) {
    negativeChordVal = "sus2";
  } else if (arrayEquals(sus4Chord, negativeChordPattern)) {
    negativeChordVal = "sus4";
  } else if (arrayEquals(dimChord, negativeChordPattern)) {
    negativeChordVal = "dim";
  } else if (arrayEquals(augChord, negativeChordPattern)) {
    negativeChordVal = "aug";
  } else if (arrayEquals(dominant7Chord, negativeChordPattern)) {
    negativeChordVal = "7";
  } else if (arrayEquals(m6NegChord, negativeChordPattern)) {
    negativeChordVal = "7";
  } else if (arrayEquals(diminished7Chord, negativeChordPattern)) {
    negativeChordVal = "dim7";
  } else if (arrayEquals(dom7sus4Chord, negativeChordPattern)) {
    negativeChordVal = "7sus4";
  } else if (arrayEquals(chords5Chord, negativeChordPattern)) {
    negativeChordVal = "5Chord";
  } else if (arrayEquals(chords6Chord, negativeChordPattern)) {
    negativeChordVal = "6Chord";
  } else {
    negativeChordVal = "???";
  }

  diatonicDetection();
}

function diatonicDetection() {
  for (var n = 0; n < positiveChord.length; n++) {
    var checkDiatonic = positiveChord[n].note;
    for (var i = 0; i < positiveScale.length; i++) {
      var scaleNote = positiveScale[i];
      if (checkDiatonic == scaleNote) {
        positiveChord[n].diatonic = false;
      }
    }
  }
  for (var n = 0; n < negativeChord.length; n++) {
    var checkDiatonic = negativeChord[n].note;
    for (var i = 0; i < negativeScale.length; i++) {
      var scaleNote = negativeScale[i];
      if (checkDiatonic == scaleNote) {
        negativeChord[n].diatonic = false;
      }
    }
  }
}

var date;
function getDate() {
  var today = new Date();
  date =
    today.getFullYear() + "" + (today.getMonth() + 1) + "." + today.getDate();
}
getDate();

async function askForReview() {
  if (chordsUnlocked == true) {
    var numberDATE = Number(date);

    var timeStamp = await AsyncStorage.getItem("reviewTimeStampSAVE");
    var reviewTimeStamp = Number(timeStamp);

    if (
      (reviewTimeStamp <= numberDATE || reviewTimeStamp == 0) &&
      (await StoreReview.isAvailableAsync()) &&
      (await StoreReview.hasAction())
    ) {
      StoreReview.requestReview();

      var newTimeStamp = numberDATE + 1;
      /* 0.1 = 1day, 1 = 1month */

      await AsyncStorage.setItem(
        "reviewTimeStampSAVE",
        JSON.stringify(newTimeStamp)
      );
    }
  }
}

export class AnimatedIcon extends Component {
  state = {
    rotateAnim: new Animated.Value(0),
  };

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    this.state.rotateAnim.setValue(0);
    Animated.timing(this.state.rotateAnim, {
      toValue: 1,
      duration: 24000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      this.startAnimation();
    });
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.icon,
          {
            transform: [
              {
                rotate: this.state.rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          },
        ]}
      >
        <Icon />
      </Animated.View>
    );
  }
}

export const Exit = () => {
  return (
    <Svg height="100%" width="100%" viewBox="0 0 352 352">
      <Path
        fill={colors.blue}
        d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
      />
    </Svg>
  );
};

export const DisclamerScreen = ({ disclamerCallback }) => {
  const disclamerClose = () => {
    if (chordsUnlocked == false) {
      showInitialScales();
      showInitialChords();
      disclamerCallback(false);
    } else {
      visibleScales = true;
      chordsUnlocked = true;
      showInitialScales();
      showInitialChords();
      disclamerCallback(false);
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

export const RewardedScreen = ({ rewardedCallback }) => {
  const [loadRewarded, setLoadRewarded] = useState(false);

  const ref = useRef(null);

  const rewardedTimeOut = () => {
    setLoadRewarded(true);
  };

  AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
    resetRewarded();
  });

  AdMobRewarded.addEventListener("rewardedVideoDidFailToPresent", () => {
    resetRewarded();
  });

  AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
    resetRewarded();
  });

  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
    unlockChords();
  });

  function resetRewarded() {
    if (chordsUnlocked == false) {
      setTimeout(function () {
        setLoadRewarded(false);
      }, 10000);
    }
  }

  async function requestReward() {
    rewardedTimeOut();

    await AdMobRewarded.setAdUnitID(
      Platform.OS === "ios" ? admob.rewarded.ios : admob.rewarded.android
    ); // 1. iOS, 2. Android
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  }

  function unlockChords() {
    visibleScales = true;
    chordsUnlocked = true;
    showInitialScales();
    showInitialChords();
    rewardedCallback(false);
  }

  return (
    <View style={styles.rewardedWrapper}>
      <TouchableOpacity
        style={styles.exit}
        disabled={loadRewarded}
        onPress={
          (showScales(), showInitialChords(), () => rewardedCallback(false))
        }
      >
        <Svg height="100%" width="100%" viewBox="0 0 352 352">
          <Path
            fill={!loadRewarded ? colors.blue : colors.disabled}
            d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
          />
        </Svg>
      </TouchableOpacity>
      <View style={styles.rewardedExp}>
        <Text style={styles.rewardedExpText}>To unlock chords</Text>
        <Text style={styles.rewardedExpText}>watch this Advert:</Text>
      </View>
      <TouchableOpacity
        style={!loadRewarded ? styles.rewardedStart : styles.rewardedDisabled}
        activeOpacity={1}
        disabled={loadRewarded}
        onPress={() => requestReward()}
      >
        {!loadRewarded ? (
          <Text style={styles.rewardedStartText}>Watch the Ad</Text>
        ) : (
          <ActivityIndicator size="large" color={colors.white} />
        )}
      </TouchableOpacity>
      <Text style={styles.rewardedDisc}>
        If no Advert is shown come back a bit later
      </Text>
    </View>
  );
};

var deviceHeight = Dimensions.get("screen").height;
var scaleHeight =
  Platform.OS === "ios" && !Platform.isPad
    ? Math.round((34.9 / 100) * deviceHeight)
    : Math.round((33 / 100) * deviceHeight);
var visibleScalesHeight = deviceHeight;
export const DisplayScales = forwardRef((props, ref) => {
  const slideIn = useRef(new Animated.Value(visibleScalesHeight)).current;

  const popScales = () => {
    var bottomOfScreen = deviceHeight - scaleHeight;
    visibleScalesHeight = bottomOfScreen;
    Animated.timing(slideIn, {
      toValue: bottomOfScreen,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideUp = {
    transform: [
      {
        translateY: slideIn,
      },
    ],
  };

  useImperativeHandle(ref, () => {
    return {
      popScales: popScales,
    };
  });
  return (
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
  );
});

export const ScalesScreen = ({ switchCallback }) => {
  const keyColorBG = colors.white;
  const keyColorText = colors.negativeText;
  const keyColorSymbol = colors.positiveText;
  const activeKeyColorBG = colors.blue;
  const activeKeyColorText = colors.white;
  const activeKeyColorSymbol = colors.whiteGray;

  const [legendStatus, setLegendStatus] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);

  const ref = useRef(null);
  const opacity = useState(new Animated.Value(0))[0];

  function initialFadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }

  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function fadeOut() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const legendToggle = () => {
    if (legendStatus == false) {
      fadeOut();
      setTimeout(function () {
        setLegendStatus(true);
        fadeIn();
      }, 150);
    } else {
      fadeOut();
      setTimeout(function () {
        setLegendStatus(false);
        fadeIn();
      }, 150);
    }
  };

  const openSelectList = () => {
    switchCallback(true);
    setOpenSelect(true);
  };

  const selectedScale = (name, value) => {
    setSelectedScaleName(name);
    selectedScaleNameSaved = name;
    selectedScaleDisplaySaved = name;
    selectedScaleValSaved = value;

    showScales();

    switchCallback(false);
    setOpenSelect(false);
  };

  const keyG1 = "G1";
  const keyG2 = "G2";
  const keyG3 = "G3";
  const keyG4 = "G4";
  const keyG5 = "G5";
  const keyG6 = "G6";
  const keyG7 = "G7";
  const keyG8 = "G8";
  const keyG9 = "G9";
  const keyG10 = "G10";
  const keyG11 = "G11";
  const keyG12 = "G12";

  const [activeKeyX, setActiveKeyX] = useState(activeKeyXSaved);
  const [activeKeyY, setActiveKeyY] = useState(activeKeyYSaved);
  const [activeKeyGroup, setActiveKeyGroup] = useState(activeKeyGroupSaved);
  const [activeKeyField, setActiveKeyField] = useState(activeKeyFieldSaved);
  const [selectedScaleName, setSelectedScaleName] = useState(
    selectedScaleNameSaved
  );
  const [axisStatus, setAxisStatus] = useState(axisStatusSaved);
  const [axisDeg, setAxisDeg] = useState(axisDegSaved);

  useEffect(() => {
    setActiveKeyX(activeKeyXSaved);
    setActiveKeyY(activeKeyYSaved);
    setActiveKeyGroup(activeKeyGroupSaved);
    setActiveKeyField(activeKeyFieldSaved);
    setSelectedScaleName(selectedScaleNameSaved);
    setAxisStatus(axisStatusSaved);
    setAxisDeg(axisDegSaved);
    initialFadeIn();
  }, []);

  const keyPress = (keyG, value, angle) => {
    if (axisStatus == false) {
      axisStatusSaved = true;
      setAxisStatus(true);
      ref.current.popScales();
    }

    cloneScale = musicScale.slice();

    let rootNote = value;
    for (let i = 0; i < rootNote; i++) cloneScale.push(cloneScale.shift());

    cloneNegativeScale = cloneScale.slice();

    for (let n = 0; n < 8; n++)
      cloneNegativeScale.push(cloneNegativeScale.shift());
    cloneNegativeScale.reverse();

    selectedScaleKeySaved = cloneScale[0];
    showScales();

    if (visibleScales == false) {
      visibleScales = true;
    }

    setActiveKeyGroup(keyG);
    activeKeyGroupSaved = keyG;
    setActiveKeyField(value);
    activeKeyFieldSaved = value;
    setAxisDeg(angle);
    axisDegSaved = angle;

    if (keyG == keyG1) {
      let newX = -15;
      let newY = -30;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG2) {
      let newX = -30;
      let newY = -20;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG3) {
      let newX = -30;
      let newY = 0;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG4) {
      let newX = -30;
      let newY = 15;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG5) {
      let newX = -20;
      let newY = 30;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG6) {
      let newX = 0;
      let newY = 30;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG7) {
      let newX = 15;
      let newY = 30;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG8) {
      let newX = 30;
      let newY = 20;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG9) {
      let newX = 30;
      let newY = 0;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG10) {
      let newX = 30;
      let newY = -15;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG11) {
      let newX = 20;
      let newY = -30;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    } else if (keyG == keyG12) {
      let newX = 0;
      let newY = -30;
      setActiveKeyX(newX);
      setActiveKeyY(newY);
      activeKeyXSaved = newX;
      activeKeyYSaved = newY;
    }

    askForReview();
  };

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.navigation}>
        <TouchableOpacity disabled={openSelect} onPress={legendToggle}>
          <Info style={styles.info} />
        </TouchableOpacity>
      </View>

      <View style={styles.selectWrapper}>
        {legendStatus ? (
          <Animated.View style={[styles.legendContainer, { opacity }]}>
            <Legend style={styles.legend} />
          </Animated.View>
        ) : null}
        {legendStatus ? null : (
          <Animated.View style={{ opacity }}>
            <Text style={styles.selectTextExp}>
              Select a scale and tap on a field:
            </Text>

            <TouchableOpacity
              style={styles.selectInput}
              disabled={legendStatus}
              onPress={openSelectList}
            >
              <Text style={styles.selectInputText}>{selectedScaleName}</Text>
              <ListArrow style={styles.selectListArrow} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      <View style={styles.circleWrapper}>
        <Svg
          style={styles.circleKeys}
          height={!Platform.isPad ? "90%" : "100%"}
          width={!Platform.isPad ? "90%" : "100%"}
          viewBox="-30 -30 690 690"
        >
          <G>
            <G>
              <G
                x={activeKeyGroup == keyG1 ? activeKeyX : 0}
                y={activeKeyGroup == keyG1 ? activeKeyY : 0}
                onPress={() => keyPress(keyG1, 9, 0)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG1 && activeKeyField == 9
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1565.85,2614.42l58.85,101.93a99.44,99.44,0,0,1,35.88-9.6V2589.08A216.44,216.44,0,0,0,1565.85,2614.42Zm64.41,33.66h-2.91v-2a6.27,6.27,0,0,1-5.07,2.26,5.76,5.76,0,0,1-3.92-1.34,4.49,4.49,0,0,1-1.56-3.59,3.79,3.79,0,0,1,1.66-3.36,7.92,7.92,0,0,1,4.48-1.11h4.14v-.57c0-2-1.12-3-3.36-3a7.93,7.93,0,0,0-4.41,1.54l-1.42-2a9.9,9.9,0,0,1,6.28-2.19,6.76,6.76,0,0,1,4.38,1.36,5.11,5.11,0,0,1,1.71,4.26Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG1 && activeKeyField == 9
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1620,2643.31a1.93,1.93,0,0,0,.86,1.7,4.14,4.14,0,0,0,2.38.59,4.31,4.31,0,0,0,2.67-.86,2.73,2.73,0,0,0,1.15-2.32v-1.27h-3.61C1621.15,2641.15,1620,2641.86,1620,2643.31Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG1 && activeKeyField == 9
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1624.17,2632.66a9.9,9.9,0,0,0-6.28,2.19l1.42,2a7.93,7.93,0,0,1,4.41-1.54c2.24,0,3.36,1,3.36,3v.57h-4.14a7.92,7.92,0,0,0-4.48,1.11,3.79,3.79,0,0,0-1.66,3.36,4.49,4.49,0,0,0,1.56,3.59,5.76,5.76,0,0,0,3.92,1.34,6.27,6.27,0,0,0,5.07-2.26v2h2.91v-9.8a5.11,5.11,0,0,0-1.71-4.26A6.76,6.76,0,0,0,1624.17,2632.66Zm2.89,9.76a2.73,2.73,0,0,1-1.15,2.32,4.31,4.31,0,0,1-2.67.86,4.14,4.14,0,0,1-2.38-.59,1.93,1.93,0,0,1-.86-1.7c0-1.45,1.15-2.16,3.45-2.16h3.61Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG2 ? activeKeyX : 0}
                y={activeKeyGroup == keyG2 ? activeKeyY : 0}
                onPress={() => keyPress(keyG2, 2, 330)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG2 && activeKeyField == 2
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1552.86,2621.94a218.64,218.64,0,0,0-69.34,69.34l101.93,58.85a100.58,100.58,0,0,1,26.26-26.26Zm.26,74.39h-3.19V2694a5.93,5.93,0,0,1-5.17,2.52,6.81,6.81,0,0,1-5-2.18,7.72,7.72,0,0,1-2.15-5.7,7.47,7.47,0,0,1,2.21-5.66,7.27,7.27,0,0,1,5.23-2.12,5.78,5.78,0,0,1,4.9,2.57v-8.33h3.19Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG2 && activeKeyField == 2
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1545.44,2683.71a4.33,4.33,0,0,0-3.28,1.46,5,5,0,0,0-1.37,3.63,4.74,4.74,0,0,0,1.39,3.55,4.56,4.56,0,0,0,3.29,1.38,4.25,4.25,0,0,0,3.2-1.39,4.94,4.94,0,0,0,1.31-3.56,5.14,5.14,0,0,0-1.31-3.61A4.14,4.14,0,0,0,1545.44,2683.71Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG2 && activeKeyField == 2
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1549.93,2683.47a5.78,5.78,0,0,0-4.9-2.57,7.27,7.27,0,0,0-5.23,2.12,7.47,7.47,0,0,0-2.21,5.66,7.72,7.72,0,0,0,2.15,5.7,6.81,6.81,0,0,0,5,2.18,5.93,5.93,0,0,0,5.17-2.52v2.29h3.19v-21.19h-3.19Zm-1.26,8.87a4.25,4.25,0,0,1-3.2,1.39,4.56,4.56,0,0,1-3.29-1.38,4.74,4.74,0,0,1-1.39-3.55,5,5,0,0,1,1.37-3.63,4.33,4.33,0,0,1,3.28-1.46,4.14,4.14,0,0,1,3.23,1.46,5.14,5.14,0,0,1,1.31,3.61A4.94,4.94,0,0,1,1548.67,2692.34Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG3 ? activeKeyX : 0}
                y={activeKeyGroup == keyG3 ? activeKeyY : 0}
                onPress={() => keyPress(keyG3, 7, 300)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 7
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1499.37,2753.4a3.83,3.83,0,0,0-3.1,1.4,5,5,0,0,0-1.15,3.27,4.84,4.84,0,0,0,1.15,3.23,3.93,3.93,0,0,0,3.12,1.36,4.15,4.15,0,0,0,3.17-1.32,4.67,4.67,0,0,0,1.21-3.27,4.75,4.75,0,0,0-1.23-3.31A4.09,4.09,0,0,0,1499.37,2753.4Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 7
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1476,2704.27a216.44,216.44,0,0,0-25.34,94.73h117.67a99.44,99.44,0,0,1,9.6-35.88Zm31,60.05q0,4-2.19,6a8,8,0,0,1-5.61,2,9.91,9.91,0,0,1-6.19-2.13l1.51-2.43a7.45,7.45,0,0,0,4.5,1.69,5.32,5.32,0,0,0,3.6-1.17,4.79,4.79,0,0,0,1.32-3.75v-1.94a5.59,5.59,0,0,1-5,2.94,6.43,6.43,0,0,1-5-2.11,8.06,8.06,0,0,1,0-10.51,6.42,6.42,0,0,1,4.95-2.11,5.87,5.87,0,0,1,4.9,2.48v-2.26h3.2Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 7
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1503.77,2753.32a5.87,5.87,0,0,0-4.9-2.48,6.42,6.42,0,0,0-4.95,2.11,8.06,8.06,0,0,0,0,10.51,6.43,6.43,0,0,0,5,2.11,5.59,5.59,0,0,0,5-2.94v1.94a4.79,4.79,0,0,1-1.32,3.75,5.32,5.32,0,0,1-3.6,1.17,7.45,7.45,0,0,1-4.5-1.69l-1.51,2.43a9.91,9.91,0,0,0,6.19,2.13,8,8,0,0,0,5.61-2q2.19-2,2.19-6v-13.26h-3.2Zm-1.21,8a4.15,4.15,0,0,1-3.17,1.32,3.93,3.93,0,0,1-3.12-1.36,4.84,4.84,0,0,1-1.15-3.23,5,5,0,0,1,1.15-3.27,3.83,3.83,0,0,1,3.1-1.4,4.09,4.09,0,0,1,3.17,1.36,4.75,4.75,0,0,1,1.23,3.31A4.67,4.67,0,0,1,1502.56,2761.34Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG4 ? activeKeyX : 0}
                y={activeKeyGroup == keyG4 ? activeKeyY : 0}
                onPress={() => keyPress(keyG4, 0, 270)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG4 && activeKeyField == 0
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1568.33,2814H1450.66a216.44,216.44,0,0,0,25.34,94.73l101.93-58.85A99.44,99.44,0,0,1,1568.33,2814Zm-68.19,43.34a7.64,7.64,0,0,1-5.45-2.15,8,8,0,0,1,.1-11.32,8.3,8.3,0,0,1,5.81-2.18,7.91,7.91,0,0,1,5.8,2.38l-1.89,2.31a6.07,6.07,0,0,0-4-1.72,5,5,0,0,0-3.47,1.33,4.41,4.41,0,0,0-1.47,3.42,5,5,0,0,0,5,5,5.56,5.56,0,0,0,4-1.94l1.89,2.06A8.75,8.75,0,0,1,1500.14,2857.35Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG4 && activeKeyField == 0
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1500.64,2854.44a5,5,0,0,1-5-5,4.41,4.41,0,0,1,1.47-3.42,5,5,0,0,1,3.47-1.33,6.07,6.07,0,0,1,4,1.72l1.89-2.31a7.91,7.91,0,0,0-5.8-2.38,8.3,8.3,0,0,0-5.81,2.18,8,8,0,0,0-.1,11.32,7.64,7.64,0,0,0,5.45,2.15,8.75,8.75,0,0,0,6.4-2.79l-1.89-2.06A5.56,5.56,0,0,1,1500.64,2854.44Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG5 ? activeKeyX : 0}
                y={activeKeyGroup == keyG5 ? activeKeyY : 0}
                onPress={() => keyPress(keyG5, 5, 240)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG5 && activeKeyField == 5
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1585.45,2862.88l-101.93,58.85a218.64,218.64,0,0,0,69.34,69.34l58.85-101.93A100.58,100.58,0,0,1,1585.45,2862.88Zm-36.77,60a2.74,2.74,0,0,0-2-1,2,2,0,0,0-1.6.65,2.51,2.51,0,0,0-.57,1.73v1.25h4V2928h-4v12.63h-3.2V2928h-1.91v-2.57h1.91v-1.17a5.07,5.07,0,0,1,1.44-3.81,4.8,4.8,0,0,1,3.48-1.42,5.52,5.52,0,0,1,3.73,1.52Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG5 && activeKeyField == 5
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1542.78,2920.49a5.07,5.07,0,0,0-1.44,3.81v1.17h-1.91V2928h1.91v12.63h3.2V2928h4v-2.57h-4v-1.25a2.51,2.51,0,0,1,.57-1.73,2,2,0,0,1,1.6-.65,2.74,2.74,0,0,1,2,1l1.31-2.26a5.52,5.52,0,0,0-3.73-1.52A4.8,4.8,0,0,0,1542.78,2920.49Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG6 ? activeKeyX : 0}
                y={activeKeyGroup == keyG6 ? activeKeyY : 0}
                onPress={() => keyPress(keyG6, 10, 210)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1613.54,2961.57a4.19,4.19,0,0,0,2.38.58,4.27,4.27,0,0,0,2.67-.86,2.72,2.72,0,0,0,1.14-2.31v-1.28h-3.59c-2.31,0-3.46.72-3.46,2.17A1.92,1.92,0,0,0,1613.54,2961.57Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1635.16,2983.8H1635a1.25,1.25,0,0,0-.57.15,2.49,2.49,0,0,0-1.13,1.27v3.51a12.4,12.4,0,0,0,1.86-2,4,4,0,0,0,.64-1.27,1.73,1.73,0,0,0,0-1.17A.77.77,0,0,0,1635.16,2983.8Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1618.1,2978.67a4.22,4.22,0,0,0-3.23,1.44,5.17,5.17,0,0,0-1.31,3.62,4.89,4.89,0,0,0,1.31,3.54,4.18,4.18,0,0,0,3.2,1.39,4.58,4.58,0,0,0,3.29-1.36,4.78,4.78,0,0,0,1.39-3.56,5,5,0,0,0-1.37-3.63A4.42,4.42,0,0,0,1618.1,2978.67Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1635.52,2953.63l-.34.15c-.83.39-1.67.76-2.51,1.12l0,4.11,2.85-1.26c0-.88,0-1.82,0-2.75Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1624.7,2896.66l-58.85,101.93a216.44,216.44,0,0,0,94.73,25.34V2906.26A99.44,99.44,0,0,1,1624.7,2896.66Zm-13.56,59.93a7.9,7.9,0,0,1,4.49-1.12h4.14v-.57c0-2-1.14-3-3.38-3a7.93,7.93,0,0,0-4.39,1.54l-1.44-2a9.83,9.83,0,0,1,6.29-2.21,6.89,6.89,0,0,1,4.39,1.36,5.16,5.16,0,0,1,1.69,4.28v9.79H1620v-2a6.24,6.24,0,0,1-5,2.25,5.81,5.81,0,0,1-3.93-1.33,4.49,4.49,0,0,1-1.55-3.58A3.76,3.76,0,0,1,1611.14,2956.59Zm12.65,32.73a6.67,6.67,0,0,1-10.18-.31v2.29h-3.19v-21.19h3.19v8.64a5.7,5.7,0,0,1,4.94-2.88,7.23,7.23,0,0,1,5.23,2.12,7.5,7.5,0,0,1,2.17,5.62A7.83,7.83,0,0,1,1623.79,2989.32Zm14.62-2.42a8,8,0,0,1-1.62,1.84,17,17,0,0,1-2.1,1.48c-.46.29-.86.52-1.25.76l-.44.26-.22.11-.2.06h-.16a.91.91,0,0,1-.7-.66v-.06l0-.24v-17h1.64v9a6.47,6.47,0,0,1,1.31-.8,3.9,3.9,0,0,1,1.62-.38,3.41,3.41,0,0,1,.85.1,4,4,0,0,1,1.22.6,2.27,2.27,0,0,1,.8,1.48A4.93,4.93,0,0,1,1638.41,2986.9Zm1-36.61c0,.41,0,.83,0,1.23s-.41.56-.45.57l-1.64.73c0,1.37,0,2.74,0,4.15l2.12-.93v1.12c0,.42,0,.83,0,1.25s-.32.51-.51.57c-.5.24-1,.48-1.6.71,0,.64,0,1.2,0,1.84l0,1.69h-1.77v-2.71l-.84.37-2,.89.06,3.17v.45h-1.79v-2.84l-2.1.93v-2.36q0-.35.45-.57c.54-.26,1.09-.5,1.64-.74v-4.13l-2.09.93v-2.41c0-.32.31-.47.45-.55l1.65-.71v-3.53h1.8v2.73l1-.46c.62-.26,1.18-.53,1.79-.78v-3.77h1.79v2.95c.51-.21,2.12-.92,2.12-.92Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 10
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1637.31,2947.13h-1.79v3.77c-.61.25-1.17.52-1.79.78l-1,.46v-2.73h-1.8v3.53l-1.65.71c-.14.08-.45.23-.45.55v2.41l2.09-.93v4.13c-.55.24-1.1.48-1.64.74q-.45.22-.45.57v2.36l2.1-.93v2.84h1.79v-.45l-.06-3.17,2-.89.84-.37v2.71h1.77l0-1.69c0-.64,0-1.2,0-1.84.58-.23,1.1-.47,1.6-.71.19-.06.51-.28.51-.57s0-.83,0-1.25V2956l-2.12.93c0-1.41,0-2.78,0-4.15l1.64-.73s.45-.23.45-.57,0-.82,0-1.23v-1.13s-1.61.71-2.12.92Zm-4.6,11.88,0-4.11c.84-.36,1.68-.73,2.51-1.12l.34-.15V2955c0,.93,0,1.87,0,2.75Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 10
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1638.31,2982a4,4,0,0,0-1.22-.6,3.41,3.41,0,0,0-.85-.1,3.9,3.9,0,0,0-1.62.38,6.47,6.47,0,0,0-1.31.8v-9h-1.64v17l0,.24v.06a.91.91,0,0,0,.7.66h.16l.2-.06.22-.11.44-.26c.39-.24.79-.47,1.25-.76a17,17,0,0,0,2.1-1.48,8,8,0,0,0,1.62-1.84,4.93,4.93,0,0,0,.7-3.47A2.27,2.27,0,0,0,1638.31,2982Zm-2.5,3.53a4,4,0,0,1-.64,1.27,12.4,12.4,0,0,1-1.86,2v-3.51a2.49,2.49,0,0,1,1.13-1.27,1.25,1.25,0,0,1,.57-.15h.16a.77.77,0,0,1,.64.51A1.73,1.73,0,0,1,1635.81,2985.48Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 10
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1618.55,2975.87a5.7,5.7,0,0,0-4.94,2.88v-8.64h-3.19v21.19h3.19V2989a6.67,6.67,0,0,0,10.18.31,7.83,7.83,0,0,0,2.16-5.71,7.5,7.5,0,0,0-2.17-5.62A7.23,7.23,0,0,0,1618.55,2975.87Zm2.81,11.43a4.58,4.58,0,0,1-3.29,1.36,4.18,4.18,0,0,1-3.2-1.39,4.89,4.89,0,0,1-1.31-3.54,5.17,5.17,0,0,1,1.31-3.62,4.22,4.22,0,0,1,3.23-1.44,4.42,4.42,0,0,1,3.28,1.44,5,5,0,0,1,1.37,3.63A4.78,4.78,0,0,1,1621.36,2987.3Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 10
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1615,2964.86a6.24,6.24,0,0,0,5-2.25v2h2.91v-9.79a5.16,5.16,0,0,0-1.69-4.28,6.89,6.89,0,0,0-4.39-1.36,9.83,9.83,0,0,0-6.29,2.21l1.44,2a7.93,7.93,0,0,1,4.39-1.54c2.24,0,3.38,1,3.38,3v.57h-4.14a7.9,7.9,0,0,0-4.49,1.12,3.76,3.76,0,0,0-1.65,3.36,4.49,4.49,0,0,0,1.55,3.58A5.81,5.81,0,0,0,1615,2964.86Zm1.17-7.16h3.59V2959a2.72,2.72,0,0,1-1.14,2.31,4.27,4.27,0,0,1-2.67.86,4.19,4.19,0,0,1-2.38-.58,1.92,1.92,0,0,1-.86-1.7C1612.68,2958.42,1613.83,2957.7,1616.14,2957.7Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG7 ? activeKeyX : 0}
                y={activeKeyGroup == keyG7 ? activeKeyY : 0}
                onPress={() => keyPress(keyG7, 3, 180)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 3
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1703.84,2978.31a5.07,5.07,0,0,0-3.17,1.08,3.45,3.45,0,0,0-1.39,2.9H1708a3.64,3.64,0,0,0-1.2-2.94A4.36,4.36,0,0,0,1703.84,2978.31Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 3
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1703.22,2962.93a4.25,4.25,0,0,0,3.2-1.38,5,5,0,0,0,1.31-3.56,5.23,5.23,0,0,0-1.31-3.62,4.21,4.21,0,0,0-3.23-1.45,4.34,4.34,0,0,0-3.28,1.45,5.09,5.09,0,0,0-1.37,3.65,4.73,4.73,0,0,0,1.39,3.54A4.54,4.54,0,0,0,1703.22,2962.93Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 3
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1721.21,2954.52l-.33.16-2.51,1.1,0,4.12,2.86-1.26c0-.89,0-1.81,0-2.75Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 3
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1720.84,2983.54h-.16a1.15,1.15,0,0,0-.57.16A2.47,2.47,0,0,0,1719,2985v3.51a12,12,0,0,0,1.86-2,4,4,0,0,0,.65-1.26,1.72,1.72,0,0,0,0-1.17A.77.77,0,0,0,1720.84,2983.54Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 3
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1711.47,2896.66a99.44,99.44,0,0,1-35.88,9.6v117.67a216.44,216.44,0,0,0,94.73-25.34Zm-13.94,55.57a7.33,7.33,0,0,1,5.25-2.12,5.74,5.74,0,0,1,4.89,2.58v-8.35h3.2v21.2h-3.2v-2.28a5.92,5.92,0,0,1-5.17,2.5,6.82,6.82,0,0,1-5-2.17,7.77,7.77,0,0,1-2.13-5.71A7.47,7.47,0,0,1,1697.53,2952.23Zm13.65,32.57h-11.9a3.45,3.45,0,0,0,1.51,2.67,5.89,5.89,0,0,0,7.54-.79l1.82,2a8.47,8.47,0,0,1-6.38,2.54,7.62,7.62,0,0,1-5.45-2.14,7.48,7.48,0,0,1-2.24-5.7,7.37,7.37,0,0,1,2.29-5.7,7.63,7.63,0,0,1,5.37-2.11,7.82,7.82,0,0,1,5.28,1.87,6.44,6.44,0,0,1,2.16,5.15Zm12.91,1.85a8.32,8.32,0,0,1-1.61,1.83,18.39,18.39,0,0,1-2.11,1.49l-1.25.75-.44.26-.22.11-.2.06h-.15a.92.92,0,0,1-.71-.66v-.06l0-.24v-17.05H1719v9a7.07,7.07,0,0,1,1.31-.8,3.91,3.91,0,0,1,1.63-.38,3.39,3.39,0,0,1,.84.1,3.86,3.86,0,0,1,1.22.6,2.3,2.3,0,0,1,.8,1.48A4.91,4.91,0,0,1,1724.09,2986.65Zm1-29.71v1.11c0,.42,0,.83,0,1.24a.73.73,0,0,1-.51.59c-.5.24-1,.48-1.6.71,0,.63,0,1.2,0,1.84l0,1.69h-1.77v-2.73l-.83.39-2.06.89.06,3.17v.44h-1.79v-2.83l-2.1.92V2962c0-.23.16-.42.46-.58.53-.25,1.08-.49,1.63-.73v-4.13l-2.09.92v-2.4c0-.33.31-.48.46-.55l1.64-.71v-3.53h1.8V2953l1-.44,1.79-.8V2948H1723v3l2.13-.93v1.12c0,.42,0,.84,0,1.25s-.4.55-.45.56l-1.64.74c0,1.37,0,2.74,0,4.14C1723.5,2957.63,1725.13,2956.94,1725.13,2956.94Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 3
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1724,2981.69a3.86,3.86,0,0,0-1.22-.6,3.39,3.39,0,0,0-.84-.1,3.91,3.91,0,0,0-1.63.38,7.07,7.07,0,0,0-1.31.8v-9h-1.64v17.05l0,.24v.06a.92.92,0,0,0,.71.66h.15l.2-.06.22-.11.44-.26,1.25-.75a18.39,18.39,0,0,0,2.11-1.49,8.32,8.32,0,0,0,1.61-1.83,4.91,4.91,0,0,0,.7-3.48A2.3,2.3,0,0,0,1724,2981.69Zm-2.49,3.54a4,4,0,0,1-.65,1.26,12,12,0,0,1-1.86,2V2985a2.47,2.47,0,0,1,1.13-1.26,1.15,1.15,0,0,1,.57-.16h.16a.77.77,0,0,1,.64.52A1.72,1.72,0,0,1,1721.5,2985.23Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 3
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1724.66,2953s.45-.22.45-.56,0-.83,0-1.25v-1.12l-2.13.93v-3h-1.79v3.76l-1.79.8-1,.44v-2.71h-1.8v3.53l-1.64.71c-.15.07-.46.22-.46.55v2.4l2.09-.92v4.13c-.55.24-1.1.48-1.63.73-.3.16-.46.35-.46.58v2.35l2.1-.92v2.83h1.79v-.44l-.06-3.17,2.06-.89.83-.39v2.73H1723l0-1.69c0-.64,0-1.21,0-1.84.59-.23,1.1-.47,1.6-.71a.73.73,0,0,0,.51-.59c0-.41,0-.82,0-1.24v-1.11s-1.63.69-2.13.92c0-1.4,0-2.77,0-4.14Zm-6.26,6.92,0-4.12,2.51-1.1.33-.16v1.37c0,.94,0,1.86,0,2.75Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 3
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1709,2977.45a7.82,7.82,0,0,0-5.28-1.87,7.63,7.63,0,0,0-5.37,2.11,7.37,7.37,0,0,0-2.29,5.7,7.48,7.48,0,0,0,2.24,5.7,7.62,7.62,0,0,0,5.45,2.14,8.47,8.47,0,0,0,6.38-2.54l-1.82-2a5.89,5.89,0,0,1-7.54.79,3.45,3.45,0,0,1-1.51-2.67h11.9v-2.2A6.44,6.44,0,0,0,1709,2977.45Zm-9.74,4.84a3.45,3.45,0,0,1,1.39-2.9,5.07,5.07,0,0,1,3.17-1.08,4.36,4.36,0,0,1,3,1,3.64,3.64,0,0,1,1.2,2.94Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 3
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1702.5,2965.76a5.92,5.92,0,0,0,5.17-2.5v2.28h3.2v-21.2h-3.2v8.35a5.74,5.74,0,0,0-4.89-2.58,7.33,7.33,0,0,0-5.25,2.12,7.47,7.47,0,0,0-2.19,5.65,7.77,7.77,0,0,0,2.13,5.71A6.82,6.82,0,0,0,1702.5,2965.76Zm-2.59-11.39a4.34,4.34,0,0,1,3.28-1.45,4.21,4.21,0,0,1,3.23,1.45,5.23,5.23,0,0,1,1.31,3.62,5,5,0,0,1-1.31,3.56,4.25,4.25,0,0,1-3.2,1.38,4.54,4.54,0,0,1-3.29-1.37,4.73,4.73,0,0,1-1.39-3.54A5.09,5.09,0,0,1,1699.91,2954.37Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG8 ? activeKeyX : 0}
                y={activeKeyGroup == keyG8 ? activeKeyY : 0}
                onPress={() => keyPress(keyG8, 8, 150)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 8
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1780.28,2945.84a1.92,1.92,0,0,0,.86,1.69,4.14,4.14,0,0,0,2.39.59,4.3,4.3,0,0,0,2.66-.86,2.73,2.73,0,0,0,1.15-2.31v-1.29h-3.6C1781.43,2943.66,1780.28,2944.39,1780.28,2945.84Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 8
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1783.32,2911.09a3.83,3.83,0,0,0-3.11,1.41,5,5,0,0,0-1.15,3.26,4.9,4.9,0,0,0,1.15,3.24,4,4,0,0,0,3.12,1.35,4.06,4.06,0,0,0,3.16-1.32,4.57,4.57,0,0,0,1.22-3.27,4.72,4.72,0,0,0-1.23-3.31A4.09,4.09,0,0,0,1783.32,2911.09Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 8
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1801.38,2943.14h-.15a1.19,1.19,0,0,0-.58.15,2.49,2.49,0,0,0-1.13,1.27v3.51a12.4,12.4,0,0,0,1.86-2,4,4,0,0,0,.65-1.27,1.79,1.79,0,0,0,0-1.17A.78.78,0,0,0,1801.38,2943.14Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 8
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1750.72,2862.88a100.58,100.58,0,0,1-26.26,26.26l58.85,101.93a218.64,218.64,0,0,0,69.34-69.34Zm39.82,87.72h-2.91v-2a6.27,6.27,0,0,1-5.06,2.26,5.74,5.74,0,0,1-3.92-1.34,4.5,4.5,0,0,1-1.56-3.58,3.76,3.76,0,0,1,1.65-3.36,7.88,7.88,0,0,1,4.48-1.12h4.14v-.56c0-2-1.12-3-3.36-3a7.88,7.88,0,0,0-4.4,1.54l-1.43-2a9.86,9.86,0,0,1,6.28-2.19,6.76,6.76,0,0,1,4.38,1.35,5.1,5.1,0,0,1,1.71,4.27Zm.37-28.59q0,4-2.18,6a8,8,0,0,1-5.62,2,9.81,9.81,0,0,1-6.19-2.13l1.51-2.43a7.42,7.42,0,0,0,4.49,1.69,5.31,5.31,0,0,0,3.61-1.17,4.78,4.78,0,0,0,1.32-3.74v-1.95a5.31,5.31,0,0,1-2,2.14,5.59,5.59,0,0,1-3,.8,6.47,6.47,0,0,1-5-2.11,8.06,8.06,0,0,1,0-10.51,6.41,6.41,0,0,1,5-2.11,5.85,5.85,0,0,1,4.89,2.48v-2.26h3.2Zm13.72,24.23a7.9,7.9,0,0,1-1.61,1.84,19.09,19.09,0,0,1-2.1,1.48c-.47.29-.86.52-1.26.75l-.44.27-.21.1-.21.06h-.15a.91.91,0,0,1-.71-.65V2950l0-.24v-17.05h1.63v9a6.57,6.57,0,0,1,1.31-.8,3.78,3.78,0,0,1,1.63-.39,3.54,3.54,0,0,1,.85.11,3.71,3.71,0,0,1,1.21.6,2.21,2.21,0,0,1,.8,1.48A4.87,4.87,0,0,1,1804.63,2946.24Zm1-36.65c0,.42,0,.83,0,1.24s-.41.55-.45.56l-1.64.74c0,1.37,0,2.75,0,4.14l2.12-.91v1.11c0,.41,0,.82,0,1.24a.7.7,0,0,1-.51.58c-.51.24-1,.48-1.6.72,0,.62,0,1.19,0,1.84l0,1.68h-1.77v-2.72l-.84.38-2,.9.06,3.16v.44h-1.79v-2.83l-2.1.92v-2.35c0-.23.14-.42.44-.57.53-.25,1.08-.49,1.65-.73V2915c-.48.2-2.09.92-2.09.92v-2.4c0-.34.31-.48.44-.55l1.66-.72v-3.52h1.8v2.71l1-.44c.61-.28,1.18-.54,1.79-.8v-3.76h1.79v3l2.12-.93Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 8
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1801.76,2912.93l-.34.17-2.51,1.1,0,4.12,2.85-1.27c0-.88,0-1.8,0-2.75Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 8
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1803.55,2906.44h-1.79v3.76c-.61.26-1.18.52-1.79.8l-1,.44v-2.71h-1.8v3.52l-1.66.72c-.13.07-.44.21-.44.55v2.4s1.61-.72,2.09-.92v4.13c-.57.24-1.12.48-1.65.73-.3.15-.44.34-.44.57v2.35l2.1-.92v2.83H1799v-.44l-.06-3.16,2-.9.84-.38v2.72h1.77l0-1.68c0-.65,0-1.22,0-1.84.59-.24,1.09-.48,1.6-.72a.7.7,0,0,0,.51-.58c0-.42,0-.83,0-1.24v-1.11l-2.12.91c0-1.39,0-2.77,0-4.14l1.64-.74s.45-.21.45-.56,0-.82,0-1.24v-1.12l-2.12.93Zm-4.59,11.88,0-4.12,2.51-1.1.34-.17v1.37c0,.95,0,1.87,0,2.75Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 8
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1804.53,2941.29a3.71,3.71,0,0,0-1.21-.6,3.54,3.54,0,0,0-.85-.11,3.78,3.78,0,0,0-1.63.39,6.57,6.57,0,0,0-1.31.8v-9h-1.63v17.05l0,.24v.06a.91.91,0,0,0,.71.65h.15l.21-.06.21-.1.44-.27c.4-.23.79-.46,1.26-.75a19.09,19.09,0,0,0,2.1-1.48,7.9,7.9,0,0,0,1.61-1.84,4.87,4.87,0,0,0,.7-3.47A2.21,2.21,0,0,0,1804.53,2941.29Zm-2.49,3.53a4,4,0,0,1-.65,1.27,12.4,12.4,0,0,1-1.86,2v-3.51a2.49,2.49,0,0,1,1.13-1.27,1.19,1.19,0,0,1,.58-.15h.15a.78.78,0,0,1,.65.51A1.79,1.79,0,0,1,1802,2944.82Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 8
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1784.45,2935.19a9.86,9.86,0,0,0-6.28,2.19l1.43,2a7.88,7.88,0,0,1,4.4-1.54c2.24,0,3.36,1,3.36,3v.56h-4.14a7.88,7.88,0,0,0-4.48,1.12,3.76,3.76,0,0,0-1.65,3.36,4.5,4.5,0,0,0,1.56,3.58,5.74,5.74,0,0,0,3.92,1.34,6.27,6.27,0,0,0,5.06-2.26v2h2.91v-9.79a5.1,5.1,0,0,0-1.71-4.27A6.76,6.76,0,0,0,1784.45,2935.19Zm2.89,9.76a2.73,2.73,0,0,1-1.15,2.31,4.3,4.3,0,0,1-2.66.86,4.14,4.14,0,0,1-2.39-.59,1.92,1.92,0,0,1-.86-1.69c0-1.45,1.15-2.18,3.46-2.18h3.6Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 8
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1787.71,2911a5.85,5.85,0,0,0-4.89-2.48,6.41,6.41,0,0,0-5,2.11,8.06,8.06,0,0,0,0,10.51,6.47,6.47,0,0,0,5,2.11,5.59,5.59,0,0,0,3-.8,5.31,5.31,0,0,0,2-2.14v1.95a4.78,4.78,0,0,1-1.32,3.74,5.31,5.31,0,0,1-3.61,1.17,7.42,7.42,0,0,1-4.49-1.69l-1.51,2.43a9.81,9.81,0,0,0,6.19,2.13,8,8,0,0,0,5.62-2q2.18-2,2.18-6v-13.26h-3.2Zm-1.22,8a4.06,4.06,0,0,1-3.16,1.32,4,4,0,0,1-3.12-1.35,4.9,4.9,0,0,1-1.15-3.24,5,5,0,0,1,1.15-3.26,3.83,3.83,0,0,1,3.11-1.41,4.09,4.09,0,0,1,3.16,1.36,4.72,4.72,0,0,1,1.23,3.31A4.57,4.57,0,0,1,1786.49,2919Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG9 ? activeKeyX : 0}
                y={activeKeyGroup == keyG9 ? activeKeyY : 0}
                onPress={() => keyPress(keyG9, 1, 120)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG9 && activeKeyField == 1
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1827.32,2858.19a4.37,4.37,0,0,0-3.29,1.46,5.17,5.17,0,0,0-1.37,3.64,4.78,4.78,0,0,0,1.41,3.56,4.51,4.51,0,0,0,3.28,1.37,4.25,4.25,0,0,0,3.2-1.38,5,5,0,0,0,1.32-3.56,5.22,5.22,0,0,0-1.32-3.63A4.19,4.19,0,0,0,1827.32,2858.19Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG9 && activeKeyField == 1
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1843.89,2863.31h-.16a1.15,1.15,0,0,0-.57.16,2.51,2.51,0,0,0-1.13,1.26v3.51a12,12,0,0,0,1.86-2,3.85,3.85,0,0,0,.65-1.26,1.72,1.72,0,0,0,0-1.17A.78.78,0,0,0,1843.89,2863.31Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG9 && activeKeyField == 1
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1767.84,2814a99.44,99.44,0,0,1-9.6,35.88l101.93,58.85a216.44,216.44,0,0,0,25.34-94.73Zm54.39,16.91a8.35,8.35,0,0,1,5.82-2.18,7.92,7.92,0,0,1,5.79,2.37l-1.88,2.32a6,6,0,0,0-4-1.72,5,5,0,0,0-3.47,1.33,4.39,4.39,0,0,0-1.48,3.42,5,5,0,0,0,5,5,5.64,5.64,0,0,0,4-1.94l1.87,2.06a8.74,8.74,0,0,1-6.39,2.79,7.67,7.67,0,0,1-5.45-2.15,8,8,0,0,1,.09-11.32Zm12.78,39.9h-3.2v-2.29a5.89,5.89,0,0,1-5.17,2.52,6.88,6.88,0,0,1-5-2.17,7.79,7.79,0,0,1-2.14-5.71,7.48,7.48,0,0,1,2.2-5.66,7.3,7.3,0,0,1,5.24-2.11,5.79,5.79,0,0,1,4.9,2.57v-8.34h3.2Zm12.13-4.4a8.36,8.36,0,0,1-1.61,1.84,19.61,19.61,0,0,1-2.11,1.48l-1.25.75-.44.26-.22.11-.2.06h-.15a.91.91,0,0,1-.71-.66v-.06l0-.24v-17H1842v9a7.65,7.65,0,0,1,1.31-.8,3.91,3.91,0,0,1,1.63-.38,3.4,3.4,0,0,1,.84.11,3.65,3.65,0,0,1,1.22.59,2.3,2.3,0,0,1,.8,1.48A4.91,4.91,0,0,1,1847.14,2866.42Zm1-36.61c0,.42,0,.84,0,1.23s-.39.56-.44.58l-1.65.72c0,1.38,0,2.75,0,4.16.49-.23,2.13-.93,2.13-.93v1.12c0,.42,0,.82,0,1.24a.68.68,0,0,1-.5.57c-.51.24-1,.48-1.6.72,0,.63,0,1.19,0,1.84v1.68h-1.78V2840l-.83.37-2,.9.06,3.16v.46h-1.79v-2.85l-2.1.94v-2.37a.64.64,0,0,1,.44-.56c.54-.26,1.1-.5,1.65-.74v-4.13l-2.09.93v-2.41c0-.32.31-.48.44-.55l1.66-.72v-3.52h1.8v2.72l1-.45c.61-.26,1.18-.54,1.79-.79v-3.76h1.79v3l2.13-.92Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG9 && activeKeyField == 1
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1844.26,2833.16l-.35.15c-.83.38-1.67.75-2.5,1.11l0,4.12,2.86-1.27c0-.88,0-1.81,0-2.74Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG9 && activeKeyField == 1
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1846.05,2826.66h-1.79v3.76c-.61.25-1.18.53-1.79.79l-1,.45v-2.72h-1.8v3.52l-1.66.72c-.13.07-.44.23-.44.55v2.41l2.09-.93v4.13c-.55.24-1.11.48-1.65.74a.64.64,0,0,0-.44.56V2843l2.1-.94v2.85h1.79v-.46l-.06-3.16,2-.9.83-.37v2.71h1.78v-1.68c0-.65,0-1.21,0-1.84.59-.24,1.09-.48,1.6-.72a.68.68,0,0,0,.5-.57c0-.42,0-.82,0-1.24v-1.12s-1.64.7-2.13.93c0-1.41,0-2.78,0-4.16l1.65-.72s.44-.23.44-.58,0-.81,0-1.23v-1.12l-2.13.92Zm-4.6,11.88,0-4.12c.83-.36,1.67-.73,2.5-1.11l.35-.15v1.37c0,.93,0,1.86,0,2.74Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG9 && activeKeyField == 1
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1847,2861.46a3.65,3.65,0,0,0-1.22-.59,3.4,3.4,0,0,0-.84-.11,3.91,3.91,0,0,0-1.63.38,7.65,7.65,0,0,0-1.31.8v-9h-1.64v17l0,.24v.06a.91.91,0,0,0,.71.66h.15l.2-.06.22-.11.44-.26,1.25-.75a19.61,19.61,0,0,0,2.11-1.48,8.36,8.36,0,0,0,1.61-1.84,4.91,4.91,0,0,0,.7-3.48A2.3,2.3,0,0,0,1847,2861.46Zm-2.49,3.54a3.85,3.85,0,0,1-.65,1.26,12,12,0,0,1-1.86,2v-3.51a2.51,2.51,0,0,1,1.13-1.26,1.15,1.15,0,0,1,.57-.16h.16a.78.78,0,0,1,.64.52A1.72,1.72,0,0,1,1844.55,2865Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG9 && activeKeyField == 1
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1831.81,2858a5.79,5.79,0,0,0-4.9-2.57,7.3,7.3,0,0,0-5.24,2.11,7.48,7.48,0,0,0-2.2,5.66,7.79,7.79,0,0,0,2.14,5.71,6.88,6.88,0,0,0,5,2.17,5.89,5.89,0,0,0,5.17-2.52v2.29h3.2v-21.19h-3.2Zm-1.26,8.87a4.25,4.25,0,0,1-3.2,1.38,4.51,4.51,0,0,1-3.28-1.37,4.78,4.78,0,0,1-1.41-3.56,5.17,5.17,0,0,1,1.37-3.64,4.37,4.37,0,0,1,3.29-1.46,4.19,4.19,0,0,1,3.23,1.46,5.22,5.22,0,0,1,1.32,3.63A5,5,0,0,1,1830.55,2866.84Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG9 && activeKeyField == 1
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1827.59,2844.39a8.74,8.74,0,0,0,6.39-2.79l-1.87-2.06a5.64,5.64,0,0,1-4,1.94,5,5,0,0,1-5-5,4.39,4.39,0,0,1,1.48-3.42,5,5,0,0,1,3.47-1.33,6,6,0,0,1,4,1.72l1.88-2.32a7.92,7.92,0,0,0-5.79-2.37,8.35,8.35,0,0,0-5.82,2.18,8,8,0,0,0-.09,11.32A7.67,7.67,0,0,0,1827.59,2844.39Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG10 ? activeKeyX : 0}
                y={activeKeyGroup == keyG10 ? activeKeyY : 0}
                onPress={() => keyPress(keyG10, 6, 90)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 6
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1842.63,2772.27h-.16a1.13,1.13,0,0,0-.57.15,2.56,2.56,0,0,0-1.14,1.27l0,3.51a12.4,12.4,0,0,0,1.86-2,4,4,0,0,0,.64-1.27,1.79,1.79,0,0,0,0-1.17A.77.77,0,0,0,1842.63,2772.27Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 6
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1826.35,2766.87a3.82,3.82,0,0,0-3.09,1.4,4.92,4.92,0,0,0-1.16,3.27,4.76,4.76,0,0,0,1.16,3.22,3.87,3.87,0,0,0,3.12,1.36,4.12,4.12,0,0,0,3.16-1.31,4.65,4.65,0,0,0,1.22-3.27,4.82,4.82,0,0,0-1.23-3.32A4.15,4.15,0,0,0,1826.35,2766.87Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 6
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1843,2744.5l-.35.15c-.83.38-1.67.75-2.51,1.11l0,4.12,2.86-1.26c0-.89,0-1.82,0-2.75Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 6
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1860.17,2704.27l-101.93,58.85a99.44,99.44,0,0,1,9.6,35.88h117.67A216.44,216.44,0,0,0,1860.17,2704.27Zm-37.32,36h1.91v-1.17a5.06,5.06,0,0,1,1.45-3.81,4.76,4.76,0,0,1,3.47-1.42,5.44,5.44,0,0,1,3.74,1.52l-1.31,2.25a2.74,2.74,0,0,0-2-1,2,2,0,0,0-1.6.64,2.54,2.54,0,0,0-.58,1.74v1.25h4v2.57h-4v12.62h-3.2v-12.62h-1.91Zm11.11,37.51c0,2.69-.73,4.71-2.19,6a7.92,7.92,0,0,1-5.61,2,9.75,9.75,0,0,1-6.19-2.15l1.5-2.42a7.43,7.43,0,0,0,4.5,1.68,5.25,5.25,0,0,0,3.61-1.17,4.75,4.75,0,0,0,1.32-3.74v-1.94a5.61,5.61,0,0,1-2,2.15,5.8,5.8,0,0,1-3,.8,6.44,6.44,0,0,1-5-2.12,8.06,8.06,0,0,1,0-10.51,6.41,6.41,0,0,1,4.95-2.12,5.9,5.9,0,0,1,4.9,2.49v-2.26h3.2Zm11.91-2.4a7.67,7.67,0,0,1-1.61,1.84,18.18,18.18,0,0,1-2.1,1.48c-.46.29-.86.52-1.25.75l-.44.27-.22.1-.2.06h-.16a.88.88,0,0,1-.7-.65v-.06l0-.24v-17.05h1.64v9a6,6,0,0,1,1.31-.8,3.77,3.77,0,0,1,1.62-.39,3.41,3.41,0,0,1,.85.11,3.76,3.76,0,0,1,1.22.6,2.25,2.25,0,0,1,.8,1.48A4.93,4.93,0,0,1,1845.87,2775.37Zm1-34.22c0,.42,0,.84,0,1.23s-.41.57-.44.58l-1.65.73c0,1.37,0,2.74,0,4.15.49-.23,2.11-.93,2.11-.93V2748c0,.42,0,.83,0,1.24a.7.7,0,0,1-.5.58c-.51.23-1,.47-1.6.71,0,.64,0,1.2,0,1.84v1.68H1843v-2.71l-.84.37-2,.9.06,3.16v.46h-1.79v-2.84l-2.1.93V2752c0-.22.14-.41.44-.56.54-.26,1.09-.5,1.65-.74v-4.13l-2.09.93v-2.41c0-.32.31-.48.44-.55l1.66-.72v-3.52h1.8V2743l1-.45c.61-.26,1.18-.54,1.79-.79V2738h1.79V2741l2.11-.92Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 6
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1845.78,2770.42a3.76,3.76,0,0,0-1.22-.6,3.41,3.41,0,0,0-.85-.11,3.77,3.77,0,0,0-1.62.39,6,6,0,0,0-1.31.8v-9h-1.64v17.05l0,.24v.06a.88.88,0,0,0,.7.65h.16l.2-.06.22-.1.44-.27c.39-.23.79-.46,1.25-.75a18.18,18.18,0,0,0,2.1-1.48,7.67,7.67,0,0,0,1.61-1.84,4.93,4.93,0,0,0,.71-3.47A2.25,2.25,0,0,0,1845.78,2770.42Zm-2.5,3.53a4,4,0,0,1-.64,1.27,12.4,12.4,0,0,1-1.86,2l0-3.51a2.56,2.56,0,0,1,1.14-1.27,1.13,1.13,0,0,1,.57-.15h.16a.77.77,0,0,1,.64.51A1.79,1.79,0,0,1,1843.28,2774Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 6
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1844.8,2738H1843v3.76c-.61.25-1.18.53-1.79.79l-1,.45v-2.72h-1.8v3.52l-1.66.72c-.13.07-.44.23-.44.55v2.41l2.09-.93v4.13c-.56.24-1.11.48-1.65.74-.3.15-.44.34-.44.56v2.37l2.1-.93v2.84h1.79v-.46l-.06-3.16,2-.9.84-.37v2.71h1.78v-1.68c0-.64,0-1.2,0-1.84.58-.24,1.09-.48,1.6-.71a.7.7,0,0,0,.5-.58c0-.41,0-.82,0-1.24v-1.12s-1.62.7-2.11.93c0-1.41,0-2.78,0-4.15l1.65-.73s.44-.23.44-.58,0-.81,0-1.23V2740l-2.11.92Zm-4.6,11.88,0-4.12c.84-.36,1.68-.73,2.51-1.11l.35-.15v1.37c0,.93,0,1.86,0,2.75Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 6
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1830.76,2766.78a5.9,5.9,0,0,0-4.9-2.49,6.41,6.41,0,0,0-4.95,2.12,8.06,8.06,0,0,0,0,10.51,6.44,6.44,0,0,0,5,2.12,5.8,5.8,0,0,0,3-.8,5.61,5.61,0,0,0,2-2.15V2778a4.75,4.75,0,0,1-1.32,3.74,5.25,5.25,0,0,1-3.61,1.17,7.43,7.43,0,0,1-4.5-1.68l-1.5,2.42a9.75,9.75,0,0,0,6.19,2.15,7.92,7.92,0,0,0,5.61-2c1.46-1.33,2.19-3.35,2.19-6v-13.25h-3.2Zm-1.22,8a4.12,4.12,0,0,1-3.16,1.31,3.87,3.87,0,0,1-3.12-1.36,4.76,4.76,0,0,1-1.16-3.22,4.92,4.92,0,0,1,1.16-3.27,3.82,3.82,0,0,1,3.09-1.4,4.15,4.15,0,0,1,3.18,1.35,4.82,4.82,0,0,1,1.23,3.32A4.65,4.65,0,0,1,1829.54,2774.81Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 6
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1824.76,2755.45h3.2v-12.62h4v-2.57h-4V2739a2.54,2.54,0,0,1,.58-1.74,2,2,0,0,1,1.6-.64,2.74,2.74,0,0,1,2,1l1.31-2.25a5.44,5.44,0,0,0-3.74-1.52,4.76,4.76,0,0,0-3.47,1.42,5.06,5.06,0,0,0-1.45,3.81v1.17h-1.91v2.57h1.91Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG11 ? activeKeyX : 0}
                y={activeKeyGroup == keyG11 ? activeKeyY : 0}
                onPress={() => keyPress(keyG11, 11, 60)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG11 && activeKeyField == 11
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1791.52,2683.71a4.26,4.26,0,0,0-3.24,1.43,5.23,5.23,0,0,0-1.31,3.62,5,5,0,0,0,1.31,3.56,4.28,4.28,0,0,0,3.2,1.38,4.58,4.58,0,0,0,3.29-1.37,4.78,4.78,0,0,0,1.39-3.56,5.1,5.1,0,0,0-1.36-3.63A4.43,4.43,0,0,0,1791.52,2683.71Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG11 && activeKeyField == 11
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1783.31,2621.94l-58.85,101.93a100.58,100.58,0,0,1,26.26,26.26l101.93-58.85A218.64,218.64,0,0,0,1783.31,2621.94Zm13.9,72.42A6.68,6.68,0,0,1,1787,2694v2.29h-3.2v-21.19h3.2v8.65a5.69,5.69,0,0,1,4.94-2.89,7.25,7.25,0,0,1,5.23,2.12,7.47,7.47,0,0,1,2.16,5.62A7.83,7.83,0,0,1,1797.21,2694.36Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG11 && activeKeyField == 11
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1792,2680.9a5.69,5.69,0,0,0-4.94,2.89v-8.65h-3.2v21.19h3.2V2694a6.68,6.68,0,0,0,10.18.32,7.83,7.83,0,0,0,2.15-5.72,7.47,7.47,0,0,0-2.16-5.62A7.25,7.25,0,0,0,1792,2680.9Zm2.8,11.43a4.58,4.58,0,0,1-3.29,1.37,4.28,4.28,0,0,1-3.2-1.38,5,5,0,0,1-1.31-3.56,5.23,5.23,0,0,1,1.31-3.62,4.26,4.26,0,0,1,3.24-1.43,4.43,4.43,0,0,1,3.28,1.43,5.1,5.1,0,0,1,1.36,3.63A4.78,4.78,0,0,1,1794.77,2692.33Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG12 ? activeKeyX : 0}
                y={activeKeyGroup == keyG12 ? activeKeyY : 0}
                onPress={() => keyPress(keyG12, 4, 30)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG12 && activeKeyField == 4
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1712.07,2635.4a5.11,5.11,0,0,0-3.15,1.06,3.49,3.49,0,0,0-1.4,2.91h8.7a3.65,3.65,0,0,0-1.19-2.94A4.43,4.43,0,0,0,1712.07,2635.4Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG12 && activeKeyField == 4
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1675.59,2589.08v117.67a99.44,99.44,0,0,1,35.88,9.6l58.85-101.93A216.44,216.44,0,0,0,1675.59,2589.08Zm33.43,55.47a5.92,5.92,0,0,0,7.55-.78l1.83,2a8.53,8.53,0,0,1-6.4,2.54,7.64,7.64,0,0,1-5.45-2.13,7.53,7.53,0,0,1-2.23-5.72,7.36,7.36,0,0,1,2.28-5.69,8.13,8.13,0,0,1,10.65-.24,6.42,6.42,0,0,1,2.17,5.16v2.2h-11.9A3.43,3.43,0,0,0,1709,2644.55Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG12 && activeKeyField == 4
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1719.42,2639.69a6.42,6.42,0,0,0-2.17-5.16,8.13,8.13,0,0,0-10.65.24,7.36,7.36,0,0,0-2.28,5.69,7.53,7.53,0,0,0,2.23,5.72,7.64,7.64,0,0,0,5.45,2.13,8.53,8.53,0,0,0,6.4-2.54l-1.83-2a5.92,5.92,0,0,1-7.55.78,3.43,3.43,0,0,1-1.5-2.66h11.9Zm-11.9-.32a3.49,3.49,0,0,1,1.4-2.91,5.11,5.11,0,0,1,3.15-1.06,4.43,4.43,0,0,1,3,1,3.65,3.65,0,0,1,1.19,2.94Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG1 ? activeKeyX : 0}
                y={activeKeyGroup == keyG1 ? activeKeyY : 0}
                onPress={() => keyPress(keyG1, 0, 0)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG1 && activeKeyField == 0
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1517.06,2529.91l41.28,71.5q9.36-5,19.21-9.19a230.53,230.53,0,0,1,83-18.15V2491.5A313.47,313.47,0,0,0,1517.06,2529.91Zm78,20.5a6.77,6.77,0,0,0,5,2.07,8.06,8.06,0,0,0,6.59-3.19l3.51,3.61A13.23,13.23,0,0,1,1591,2554a13,13,0,0,1,.07-18.12,12.61,12.61,0,0,1,9.14-3.66,12.87,12.87,0,0,1,10.09,4.61l-3.4,3.85a7.94,7.94,0,0,0-6.44-3.23,7.58,7.58,0,0,0-5.29,2,7.05,7.05,0,0,0-2.18,5.44A7.42,7.42,0,0,0,1595.06,2550.41Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG1 && activeKeyField == 0
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1600.46,2537.47a7.94,7.94,0,0,1,6.44,3.23l3.4-3.85a12.87,12.87,0,0,0-10.09-4.61,12.61,12.61,0,0,0-9.14,3.66A13,13,0,0,0,1591,2554a13.23,13.23,0,0,0,19.17-1.12l-3.51-3.61a8.06,8.06,0,0,1-6.59,3.19,6.77,6.77,0,0,1-5-2.07,7.42,7.42,0,0,1-2.07-5.49,7.05,7.05,0,0,1,2.18-5.44A7.58,7.58,0,0,1,1600.46,2537.47Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG2 ? activeKeyX : 0}
                y={activeKeyGroup == keyG2 ? activeKeyY : 0}
                onPress={() => keyPress(keyG2, 5, 330)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG2 && activeKeyField == 5
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1504.07,2537.42A316.79,316.79,0,0,0,1399,2642.49l71.5,41.28a233.63,233.63,0,0,1,74.85-74.85ZM1486,2601.6H1474.6v5.3h10.79v4.8H1474.6v9.62h-5.47v-24.51H1486Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Polygon
                  fill={
                    activeKeyGroup == keyG2 && activeKeyField == 5
                      ? activeKeyColorText
                      : keyColorText
                  }
                  points="116.04 129.81 121.51 129.81 121.51 120.19 132.3 120.19 132.3 115.4 121.51 115.4 121.51 110.1 132.86 110.1 132.86 105.3 116.04 105.3 116.04 129.81"
                />
              </G>
              <G
                x={activeKeyGroup == keyG3 ? activeKeyX : 0}
                y={activeKeyGroup == keyG3 ? activeKeyY : 0}
                onPress={() => keyPress(keyG3, 10, 300)}
              >
                <Polygon
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  points="32.02 229.85 38.16 229.85 35.11 222.73 32.02 229.85"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1403.55,2755.65a10.5,10.5,0,0,0-4-.55h-3.22v5.64h3.74a8.41,8.41,0,0,0,3.53-.57,2.29,2.29,0,0,0,1.18-2.28A2.17,2.17,0,0,0,1403.55,2755.65Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1402.32,2750.29a2.06,2.06,0,0,0,1.11-2.12,2.18,2.18,0,0,0-1-2.15,8.09,8.09,0,0,0-3.44-.52h-2.62v5.28h2.59A8.7,8.7,0,0,0,1402.32,2750.29Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1391.49,2655.47a313.38,313.38,0,0,0-38.4,143.53h82.56a230.74,230.74,0,0,1,18.15-83q4.17-9.85,9.19-19.21Zm-10.73,76h-5.82l10.59-24.51h5.3l10.59,24.51h-5.83l-2.27-5.29H1383Zm27.93,31.64c-1.36,1.52-3.72,2.29-7.08,2.29h-10.73v-24.52h9.53a13.58,13.58,0,0,1,4.29.6,6,6,0,0,1,2.72,1.61,6.35,6.35,0,0,1,1.66,4.28,5.06,5.06,0,0,1-1.86,4.28,7.41,7.41,0,0,1-.88.62l-.88.39a6.51,6.51,0,0,1,3.63,2.06,5.7,5.7,0,0,1,1.35,3.87A6.59,6.59,0,0,1,1408.69,2763.09Zm5.37-37.66c-1,.41-1.91.83-2.88,1.26l.08,4.45v.63h-2.51v-4l-3,1.3v-3.32c0-.32.22-.59.63-.8.76-.35,1.54-.69,2.31-1v-5.82l-2.94,1.3V2716c0-.46.44-.67.63-.78l2.34-1,0-5h2.54v3.83l1.43-.63c.87-.39,1.67-.76,2.52-1.12v-5.29h2.53v4.16c.7-.32,3-1.3,3-1.3v1.58c0,.58,0,1.17,0,1.73s-.56.78-.62.8l-2.31,1c0,1.94,0,3.87,0,5.85.69-.32,3-1.31,3-1.31v1.58c0,.58,0,1.15,0,1.74a1,1,0,0,1-.7.82c-.72.33-1.43.67-2.25,1,0,.88,0,1.68,0,2.58l0,2.38h-2.51v-3.82Zm12.63,34.07a11.22,11.22,0,0,1-2.29,2.6,24.65,24.65,0,0,1-3,2.09c-.65.41-1.21.73-1.77,1.07l-.62.37-.3.16-.3.08h-.21a1.28,1.28,0,0,1-1-.93l0-.09,0-.33v-24.15h2.32v12.78a10,10,0,0,1,1.86-1.13,5.4,5.4,0,0,1,2.3-.54,4.81,4.81,0,0,1,1.2.15,5.52,5.52,0,0,1,1.72.84,3.15,3.15,0,0,1,1.13,2.1A7,7,0,0,1,1426.69,2759.5Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1415.21,2717.15v-1.93l-.48.23c-1.17.52-2.35,1.05-3.53,1.55l.06,5.8,4-1.79C1415.21,2719.78,1415.21,2718.48,1415.21,2717.15Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 10
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1422.09,2755.1l-.22,0a1.78,1.78,0,0,0-.81.21,3.62,3.62,0,0,0-1.61,1.8l0,5a17.88,17.88,0,0,0,2.64-2.79,5.91,5.91,0,0,0,.91-1.79,2.49,2.49,0,0,0,0-1.67A1.09,1.09,0,0,0,1422.09,2755.1Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 10
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1426.55,2752.47a5.52,5.52,0,0,0-1.72-.84,4.81,4.81,0,0,0-1.2-.15,5.4,5.4,0,0,0-2.3.54,10,10,0,0,0-1.86,1.13v-12.78h-2.32v24.15l0,.33,0,.09a1.28,1.28,0,0,0,1,.93h.21l.3-.08.3-.16.62-.37c.56-.34,1.12-.66,1.77-1.07a24.65,24.65,0,0,0,3-2.09,11.22,11.22,0,0,0,2.29-2.6,7,7,0,0,0,1-4.93A3.15,3.15,0,0,0,1426.55,2752.47Zm-3.53,5a5.91,5.91,0,0,1-.91,1.79,17.88,17.88,0,0,1-2.64,2.79l0-5a3.62,3.62,0,0,1,1.61-1.8,1.78,1.78,0,0,1,.81-.21l.22,0a1.09,1.09,0,0,1,.91.72A2.49,2.49,0,0,1,1423,2757.49Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 10
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1417.74,2728.72l0-2.38c0-.9,0-1.7,0-2.58.82-.33,1.53-.67,2.25-1a1,1,0,0,0,.7-.82c0-.59,0-1.16,0-1.74v-1.58s-2.29,1-3,1.31c0-2,0-3.91,0-5.85l2.31-1c.06,0,.62-.31.62-.8s0-1.15,0-1.73v-1.58s-2.28,1-3,1.3v-4.16h-2.53v5.29c-.85.36-1.65.73-2.52,1.12l-1.43.63v-3.83h-2.54l0,5-2.34,1c-.19.11-.63.32-.63.78v3.38l2.94-1.3v5.82c-.77.34-1.55.68-2.31,1-.41.21-.63.48-.63.8v3.32l3-1.3v4h2.51v-.63l-.08-4.45c1-.43,1.91-.85,2.88-1.26l1.17-.53v3.82Zm-6.48-5.92-.06-5.8c1.18-.5,2.36-1,3.53-1.55l.48-.23v1.93c0,1.33,0,2.63.07,3.86Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 10
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1405.46,2752.64l.88-.39a7.41,7.41,0,0,0,.88-.62,5.06,5.06,0,0,0,1.86-4.28,6.35,6.35,0,0,0-1.66-4.28,6,6,0,0,0-2.72-1.61,13.58,13.58,0,0,0-4.29-.6h-9.53v24.52h10.73c3.36,0,5.72-.77,7.08-2.29a6.59,6.59,0,0,0,1.75-4.52,5.7,5.7,0,0,0-1.35-3.87A6.51,6.51,0,0,0,1405.46,2752.64Zm-9.11-7.14H1399a8.09,8.09,0,0,1,3.44.52,2.18,2.18,0,0,1,1,2.15,2.06,2.06,0,0,1-1.11,2.12,8.7,8.7,0,0,1-3.38.49h-2.59Zm7.27,14.67a8.41,8.41,0,0,1-3.53.57h-3.74v-5.64h3.22a10.5,10.5,0,0,1,4,.55,2.17,2.17,0,0,1,1.25,2.24A2.29,2.29,0,0,1,1403.62,2760.17Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG3 && activeKeyField == 10
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1395.59,2731.45h5.83l-10.59-24.51h-5.3l-10.59,24.51h5.82l2.28-5.29h10.28Zm-10.48-10.1,3.08-7.11,3,7.11Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG4 ? activeKeyX : 0}
                y={activeKeyGroup == keyG4 ? activeKeyY : 0}
                onPress={() => keyPress(keyG4, 3, 270)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG4 && activeKeyField == 3
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1453.8,2897a230.79,230.79,0,0,1-18.15-83h-82.56a313.34,313.34,0,0,0,38.4,143.52l71.5-41.28Q1458,2906.89,1453.8,2897Zm-66.59-28.5h-8.37V2844h8.65c4.38,0,7.72,1.06,10.06,3.21s3.51,5.1,3.51,8.92-1.14,6.83-3.41,9S1391.89,2868.54,1387.21,2868.54Zm22.43,33.92h-18.06V2878h17.67v4.88H1397v5h11v4.66h-11v5.09h12.6Zm5.11-40.05-2.87,1.25.08,4.46v.62h-2.52v-4l-3,1.3v-3.32c0-.31.22-.58.64-.8.76-.36,1.53-.69,2.31-1v-5.81c-.67.28-3,1.3-3,1.3V2853c0-.47.45-.68.64-.78l2.33-1,0-5H1412v3.83l1.42-.63c.87-.38,1.67-.76,2.53-1.12v-5.29h2.52v4.16c.71-.32,3-1.3,3-1.3v1.57c0,.58,0,1.18,0,1.75s-.56.78-.63.79l-2.31,1c0,1.93,0,3.86,0,5.83.7-.32,3-1.3,3-1.3v1.58c0,.58,0,1.15,0,1.73a1,1,0,0,1-.71.82c-.72.35-1.43.68-2.25,1,0,.89,0,1.69,0,2.59l0,2.38h-2.5v-3.83Zm12.65,34.18a11.46,11.46,0,0,1-2.29,2.6,28.82,28.82,0,0,1-3,2.1c-.66.4-1.22.72-1.77,1.06l-.63.38-.31.15-.28.08h-.22a1.26,1.26,0,0,1-1-.93v-.09l-.06-.33v-24.15h2.32v12.79a9.87,9.87,0,0,1,1.86-1.14,5.4,5.4,0,0,1,2.3-.54,4.81,4.81,0,0,1,1.2.15,5.47,5.47,0,0,1,1.73.84,3.26,3.26,0,0,1,1.13,2.11A7,7,0,0,1,1427.4,2896.59Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG4 && activeKeyField == 3
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1415.91,2854.13v-1.93l-.48.22c-1.18.53-2.36,1.06-3.53,1.56l.06,5.8,4-1.78C1415.91,2856.75,1415.91,2855.45,1415.91,2854.13Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG4 && activeKeyField == 3
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1387.36,2848.79h-3v14.91h3.47a8.1,8.1,0,0,0,5.77-1.9,7.22,7.22,0,0,0,2-5.5,7.39,7.39,0,0,0-2-5.55C1392.2,2849.44,1390.13,2848.79,1387.36,2848.79Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG4 && activeKeyField == 3
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1422.79,2892.19l-.21,0a1.68,1.68,0,0,0-.83.23,3.53,3.53,0,0,0-1.59,1.79v5a17,17,0,0,0,2.63-2.79,5.51,5.51,0,0,0,.92-1.79,2.53,2.53,0,0,0,0-1.66A1.1,1.1,0,0,0,1422.79,2892.19Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG4 && activeKeyField == 3
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1427.26,2889.56a5.47,5.47,0,0,0-1.73-.84,4.81,4.81,0,0,0-1.2-.15,5.4,5.4,0,0,0-2.3.54,9.87,9.87,0,0,0-1.86,1.14v-12.79h-2.32v24.15l.06.33v.09a1.26,1.26,0,0,0,1,.93h.22l.28-.08.31-.15.63-.38c.55-.34,1.11-.66,1.77-1.06a28.82,28.82,0,0,0,3-2.1,11.46,11.46,0,0,0,2.29-2.6,7,7,0,0,0,1-4.92A3.26,3.26,0,0,0,1427.26,2889.56Zm-3.54,5a5.51,5.51,0,0,1-.92,1.79,17,17,0,0,1-2.63,2.79v-5a3.53,3.53,0,0,1,1.59-1.79,1.68,1.68,0,0,1,.83-.23l.21,0a1.1,1.1,0,0,1,.92.73A2.53,2.53,0,0,1,1423.72,2894.58Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG4 && activeKeyField == 3
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1418.43,2865.71l0-2.38c0-.9,0-1.7,0-2.59.82-.33,1.53-.66,2.25-1a1,1,0,0,0,.71-.82c0-.58,0-1.15,0-1.73v-1.58s-2.28,1-3,1.3c0-2,0-3.9,0-5.83l2.31-1c.07,0,.63-.31.63-.79s0-1.17,0-1.75v-1.57s-2.27,1-3,1.3v-4.16h-2.52v5.29c-.86.36-1.66.74-2.53,1.12l-1.42.63v-3.83h-2.54l0,5-2.33,1c-.19.1-.64.31-.64.78v3.38s2.28-1,3-1.3v5.81c-.78.34-1.55.67-2.31,1-.42.22-.64.49-.64.8v3.32l3-1.3v4H1412v-.62l-.08-4.46,2.87-1.25,1.18-.53v3.83Zm-6.47-5.93-.06-5.8c1.17-.5,2.35-1,3.53-1.56l.48-.22v1.93c0,1.32,0,2.62.07,3.87Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Polygon
                  fill={
                    activeKeyGroup == keyG4 && activeKeyField == 3
                      ? activeKeyColorText
                      : keyColorText
                  }
                  points="43.95 401.03 54.93 401.03 54.93 396.37 43.95 396.37 43.95 391.32 56.16 391.32 56.16 386.44 38.5 386.44 38.5 410.95 56.55 410.95 56.55 406.11 43.95 406.11 43.95 401.03"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG4 && activeKeyField == 3
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1401.06,2856.16c0-3.82-1.16-6.78-3.51-8.92s-5.68-3.21-10.06-3.21h-8.65v24.51h8.37c4.68,0,8.15-1.11,10.44-3.34S1401.06,2860,1401.06,2856.16Zm-7.51,5.64a8.1,8.1,0,0,1-5.77,1.9h-3.47v-14.91h3c2.77,0,4.84.65,6.19,2a7.39,7.39,0,0,1,2,5.55A7.22,7.22,0,0,1,1393.55,2861.8Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG5 ? activeKeyX : 0}
                y={activeKeyGroup == keyG5 ? activeKeyY : 0}
                onPress={() => keyPress(keyG5, 8, 240)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG5 && activeKeyField == 8
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1503.63,2971a233.16,233.16,0,0,1-33.13-41.72l-71.5,41.28a316.79,316.79,0,0,0,105.07,105.07l41.28-71.5A233.16,233.16,0,0,1,1503.63,2971ZM1448.14,2982a12.24,12.24,0,0,1,3.73-9.1,12.49,12.49,0,0,1,9-3.64,13.33,13.33,0,0,1,9.17,3.47l-2.85,4.1a11,11,0,0,0-3-2,8.26,8.26,0,0,0-3-.55,7.13,7.13,0,0,0-5.25,2.13,8.42,8.42,0,0,0-.09,11.14,6.58,6.58,0,0,0,4.89,2.09,9.5,9.5,0,0,0,4.74-1.08v-6.74h5.5v8.7q-3.65,4.07-10.1,4.07a12.47,12.47,0,0,1-9.06-3.57A12.11,12.11,0,0,1,1448.14,2982Zm31.61,46.25-2.28-5.3H1467.2l-2.28,5.3h-5.83l10.6-24.52H1475l10.58,24.52Zm10.6-36.64h-2.5v-3.83l-1.18.53-2.88,1.25.1,4.46v.62h-2.53v-4l-3,1.3v-3.32a.94.94,0,0,1,.63-.8c.76-.36,1.53-.69,2.31-1V2981c-.67.28-2.94,1.3-2.94,1.3V2979c0-.47.44-.68.63-.78l2.33-1,0-5h2.55V2976l1.42-.62c.86-.38,1.66-.76,2.53-1.12V2969h2.51v4.16l3-1.31v1.58c0,.58,0,1.18,0,1.75s-.57.77-.64.79l-2.31,1c0,1.93,0,3.86,0,5.83.7-.32,3-1.3,3-1.3v1.58c0,.58,0,1.15,0,1.73a1,1,0,0,1-.72.82c-.71.35-1.43.68-2.25,1,0,.89,0,1.69,0,2.59ZM1501,3022.4a11.47,11.47,0,0,1-2.28,2.61,26.93,26.93,0,0,1-3,2.1c-.66.4-1.22.72-1.77,1.06l-.62.37-.31.15-.29.08h-.21a1.28,1.28,0,0,1-1-.92v-.09l-.06-.33v-24.16h2.32v12.78a11,11,0,0,1,1.86-1.13,5.58,5.58,0,0,1,2.31-.53,4.86,4.86,0,0,1,1.2.14,5.53,5.53,0,0,1,1.72.85,3.17,3.17,0,0,1,1.13,2.1A7,7,0,0,1,1501,3022.4Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Polygon
                  fill={
                    activeKeyGroup == keyG5 && activeKeyField == 8
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  points="116.18 526.67 122.31 526.67 119.27 519.56 116.18 526.67"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG5 && activeKeyField == 8
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1496.36,3018l-.22,0a1.59,1.59,0,0,0-.81.23,3.56,3.56,0,0,0-1.61,1.79v5a17.81,17.81,0,0,0,2.64-2.78,5.75,5.75,0,0,0,.91-1.8,2.47,2.47,0,0,0,0-1.66A1.07,1.07,0,0,0,1496.36,3018Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG5 && activeKeyField == 8
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1487.84,2978.13l-.49.22c-1.18.53-2.36,1.06-3.53,1.56l.07,5.8,4-1.78c-.05-1.25-.05-2.55-.05-3.87Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG5 && activeKeyField == 8
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1500.82,3015.38a5.53,5.53,0,0,0-1.72-.85,4.86,4.86,0,0,0-1.2-.14,5.58,5.58,0,0,0-2.31.53,11,11,0,0,0-1.86,1.13v-12.78h-2.32v24.16l.06.33v.09a1.28,1.28,0,0,0,1,.92h.21l.29-.08.31-.15.62-.37c.55-.34,1.11-.66,1.77-1.06a26.93,26.93,0,0,0,3-2.1,11.47,11.47,0,0,0,2.28-2.61,7,7,0,0,0,1-4.92A3.17,3.17,0,0,0,1500.82,3015.38Zm-3.54,5a5.75,5.75,0,0,1-.91,1.8,17.81,17.81,0,0,1-2.64,2.78v-5a3.56,3.56,0,0,1,1.61-1.79,1.59,1.59,0,0,1,.81-.23l.22,0a1.07,1.07,0,0,1,.91.72A2.47,2.47,0,0,1,1497.28,3020.39Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG5 && activeKeyField == 8
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1492.6,2985.66a1,1,0,0,0,.72-.82c0-.58,0-1.15,0-1.73v-1.58s-2.28,1-3,1.3c0-2,0-3.9,0-5.83l2.31-1c.07,0,.64-.31.64-.79s0-1.17,0-1.75v-1.58l-3,1.31V2969h-2.51v5.29c-.87.36-1.67.74-2.53,1.12l-1.42.62v-3.82h-2.55l0,5-2.33,1c-.19.1-.63.31-.63.78v3.38s2.27-1,2.94-1.3v5.81c-.78.34-1.55.67-2.31,1a.94.94,0,0,0-.63.8V2992l3-1.3v4h2.53v-.62l-.1-4.46,2.88-1.25,1.18-.53v3.83h2.5l0-2.38c0-.9,0-1.7,0-2.59C1491.17,2986.34,1491.89,2986,1492.6,2985.66Zm-8.71.05-.07-5.8c1.17-.5,2.35-1,3.53-1.56l.49-.22v1.93c0,1.32,0,2.62.05,3.87Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG5 && activeKeyField == 8
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1469.69,3003.76l-10.6,24.52h5.83l2.28-5.3h10.27l2.28,5.3h5.81L1475,3003.76Zm-.42,14.42,3.08-7.12,3.05,7.12Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG5 && activeKeyField == 8
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1471,2990.57v-8.7h-5.5v6.74a9.5,9.5,0,0,1-4.74,1.08,6.58,6.58,0,0,1-4.89-2.09,8.42,8.42,0,0,1,.09-11.14,7.13,7.13,0,0,1,5.25-2.13,8.26,8.26,0,0,1,3,.55,11,11,0,0,1,3,2l2.85-4.1a13.33,13.33,0,0,0-9.17-3.47,12.49,12.49,0,0,0-9,3.64,12.24,12.24,0,0,0-3.73,9.1,12.11,12.11,0,0,0,3.67,9,12.47,12.47,0,0,0,9.06,3.57Q1467.32,2994.64,1471,2990.57Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG6 ? activeKeyX : 0}
                y={activeKeyGroup == keyG6 ? activeKeyY : 0}
                onPress={() => keyPress(keyG6, 1, 210)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 1
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1577.55,3020.79q-9.85-4.17-19.21-9.19l-41.28,71.5a313.34,313.34,0,0,0,143.52,38.4v-82.56A230.74,230.74,0,0,1,1577.55,3020.79ZM1573.8,3063a12.93,12.93,0,0,1,.07-18.12,12.55,12.55,0,0,1,9.13-3.65,13,13,0,0,1,10.1,4.59l-3.4,3.85a8,8,0,0,0-6.46-3.22,7.53,7.53,0,0,0-5.27,2,7,7,0,0,0-2.19,5.43,7.45,7.45,0,0,0,2.06,5.49,6.85,6.85,0,0,0,5,2.07,8.09,8.09,0,0,0,6.6-3.19l3.5,3.61a13.24,13.24,0,0,1-19.16,1.12Zm29.36,33.88q-3.42,3.35-10.42,3.34h-8.39v-24.51H1593c4.37,0,7.73,1.06,10.06,3.21s3.51,5.12,3.51,8.92S1605.45,3094.62,1603.16,3096.83Zm11-51.52c0,.59,0,1.17,0,1.74s-.57.78-.63.8l-2.3,1c0,1.93,0,3.86,0,5.84l3-1.31V3055c0,.59,0,1.15,0,1.75,0,.42-.44.73-.71.82-.72.33-1.44.67-2.25,1,0,.88,0,1.68,0,2.59l0,2.37h-2.5v-3.82l-1.17.52-2.88,1.27.08,4.45v.63h-2.53v-4l-3,1.31v-3.32a.93.93,0,0,1,.62-.8c.77-.35,1.55-.69,2.32-1v-5.83l-2.94,1.3v-3.38c0-.45.44-.67.62-.77l2.33-1v-5h2.54v3.81l1.43-.63c.86-.38,1.66-.75,2.52-1.11v-5.3h2.52V3045l3-1.3Zm10.26,49a11.4,11.4,0,0,1-2.28,2.6,26,26,0,0,1-3,2.1c-.67.41-1.23.73-1.79,1.06l-.62.38-.3.15-.3.09H1616a1.29,1.29,0,0,1-1-.94l0-.08,0-.34v-24.15h2.32V3088a9.06,9.06,0,0,1,1.86-1.13,5.42,5.42,0,0,1,2.3-.55,4.82,4.82,0,0,1,1.2.16,5,5,0,0,1,1.72.85,3.18,3.18,0,0,1,1.14,2.09A7,7,0,0,1,1624.45,3094.29Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 1
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1619.85,3089.89h-.22a1.68,1.68,0,0,0-.81.22,3.52,3.52,0,0,0-1.61,1.79l0,5a17.45,17.45,0,0,0,2.64-2.79,5.59,5.59,0,0,0,.91-1.79,2.46,2.46,0,0,0,0-1.66A1.12,1.12,0,0,0,1619.85,3089.89Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 1
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1592.87,3080.42h-3v14.91h3.47a8.12,8.12,0,0,0,5.77-1.89,7.22,7.22,0,0,0,2-5.51,7.36,7.36,0,0,0-2-5.55Q1597,3080.42,1592.87,3080.42Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 1
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1608.69,3050l-.48.24c-1.18.53-2.35,1.05-3.53,1.55l.06,5.79,4-1.78c-.07-1.24-.07-2.54-.07-3.86Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 1
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1624.31,3087.28a5,5,0,0,0-1.72-.85,4.82,4.82,0,0,0-1.2-.16,5.42,5.42,0,0,0-2.3.55,9.06,9.06,0,0,0-1.86,1.13v-12.79h-2.32v24.15l0,.34,0,.08a1.29,1.29,0,0,0,1,.94h.21l.3-.09.3-.15.62-.38c.56-.33,1.12-.65,1.79-1.06a26,26,0,0,0,3-2.1,11.4,11.4,0,0,0,2.28-2.6,7,7,0,0,0,1-4.92A3.18,3.18,0,0,0,1624.31,3087.28Zm-3.53,5a5.59,5.59,0,0,1-.91,1.79,17.45,17.45,0,0,1-2.64,2.79l0-5a3.52,3.52,0,0,1,1.61-1.79,1.68,1.68,0,0,1,.81-.22h.22a1.12,1.12,0,0,1,.91.73A2.46,2.46,0,0,1,1620.78,3092.28Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 1
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1611.21,3040.87h-2.52v5.3c-.86.36-1.66.73-2.52,1.11l-1.43.63v-3.81h-2.54v5l-2.33,1c-.18.1-.62.32-.62.77v3.38l2.94-1.3v5.83c-.77.33-1.55.67-2.32,1a.93.93,0,0,0-.62.8v3.32l3-1.31v4h2.53v-.63l-.08-4.45,2.88-1.27,1.17-.52v3.82h2.5l0-2.37c0-.91,0-1.71,0-2.59.81-.33,1.53-.67,2.25-1,.27-.09.71-.4.71-.82,0-.6,0-1.16,0-1.75v-1.58l-3,1.31c0-2,0-3.91,0-5.84l2.3-1c.06,0,.63-.32.63-.8s0-1.15,0-1.74v-1.58l-3,1.3Zm-6.47,16.72-.06-5.79c1.18-.5,2.35-1,3.53-1.55l.48-.24V3052c0,1.32,0,2.62.07,3.86Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 1
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1593,3075.66h-8.66v24.51h8.39q7,0,10.42-3.34c2.29-2.21,3.42-5.23,3.42-9s-1.17-6.78-3.51-8.92S1597.38,3075.66,1593,3075.66Zm6,17.78a8.12,8.12,0,0,1-5.77,1.89h-3.47v-14.91h3q4.17,0,6.19,2a7.36,7.36,0,0,1,2,5.55A7.22,7.22,0,0,1,1599.06,3093.44Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG6 && activeKeyField == 1
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1593,3061.83l-3.5-3.61a8.09,8.09,0,0,1-6.6,3.19,6.85,6.85,0,0,1-5-2.07,7.45,7.45,0,0,1-2.06-5.49,7,7,0,0,1,2.19-5.43,7.53,7.53,0,0,1,5.27-2,8,8,0,0,1,6.46,3.22l3.4-3.85a13,13,0,0,0-10.1-4.59,12.55,12.55,0,0,0-9.13,3.65,12.93,12.93,0,0,0-.07,18.12,13.24,13.24,0,0,0,19.16-1.12Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG7 ? activeKeyX : 0}
                y={activeKeyGroup == keyG7 ? activeKeyY : 0}
                onPress={() => keyPress(keyG7, 6, 180)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 6
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1748,3050.12l-.49.22c-1.17.53-2.35,1-3.53,1.56l.07,5.8,4-1.79c-.06-1.24-.06-2.54-.06-3.86Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 6
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1777.83,3011.6q-9.36,5-19.21,9.19a230.74,230.74,0,0,1-83,18.15v82.56a313.38,313.38,0,0,0,143.53-38.4Zm-58.63,54.74h-5.47v-24.5h16.83v4.8H1719.2v5.29H1730v4.81h-10.8Zm28.7,30.14q-3.66,4.07-10.1,4.07a12.47,12.47,0,0,1-9.07-3.58,13,13,0,0,1,.08-18.13,12.39,12.39,0,0,1,9-3.65,13.28,13.28,0,0,1,9.16,3.48l-2.83,4.1a10.9,10.9,0,0,0-3-2,8,8,0,0,0-3-.55,7.2,7.2,0,0,0-5.27,2.13,8.48,8.48,0,0,0-.09,11.14,6.62,6.62,0,0,0,4.9,2.09,9.4,9.4,0,0,0,4.73-1.08v-6.74h5.51Zm5.56-51.07c0,.58,0,1.18,0,1.74s-.58.77-.64.8l-2.31,1c0,1.94,0,3.87,0,5.85.69-.32,3-1.3,3-1.3v1.57c0,.59,0,1.16,0,1.74a1,1,0,0,1-.72.82c-.71.33-1.43.68-2.25,1,0,.89,0,1.68,0,2.59l0,2.36H1748v-3.81l-1.17.53-2.88,1.25.09,4.46v.62h-2.52v-4l-3,1.3v-3.32c0-.32.21-.59.63-.8.75-.36,1.53-.7,2.31-1V3053c-.68.28-2.94,1.3-2.94,1.3v-3.39c0-.46.43-.67.63-.78l2.33-1,0-4.95H1744V3048l1.43-.62c.86-.39,1.66-.77,2.52-1.12V3041h2.52v4.16l3-1.31Zm11.69,49a11.47,11.47,0,0,1-2.28,2.61,27.26,27.26,0,0,1-3,2.09l-1.79,1.07-.61.36-.31.16-.29.08h-.21a1.28,1.28,0,0,1-1-.92v-.09l-.06-.33v-24.16h2.32V3088a10.6,10.6,0,0,1,1.86-1.13,5.63,5.63,0,0,1,2.3-.54,4.89,4.89,0,0,1,1.21.15,5.53,5.53,0,0,1,1.72.85,3.13,3.13,0,0,1,1.13,2.1A7,7,0,0,1,1765.15,3094.39Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 6
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1760.55,3090l-.23,0a1.77,1.77,0,0,0-.81.22,3.63,3.63,0,0,0-1.6,1.79v5a17.1,17.1,0,0,0,2.64-2.8,5.43,5.43,0,0,0,.91-1.78,2.5,2.5,0,0,0,0-1.67A1.12,1.12,0,0,0,1760.55,3090Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 6
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1765,3087.37a5.53,5.53,0,0,0-1.72-.85,4.89,4.89,0,0,0-1.21-.15,5.63,5.63,0,0,0-2.3.54,10.6,10.6,0,0,0-1.86,1.13v-12.78h-2.32v24.16l.06.33v.09a1.28,1.28,0,0,0,1,.92h.21l.29-.08.31-.16.61-.36,1.79-1.07a27.26,27.26,0,0,0,3-2.09,11.47,11.47,0,0,0,2.28-2.61,7,7,0,0,0,1-4.92A3.13,3.13,0,0,0,1765,3087.37Zm-3.54,5a5.43,5.43,0,0,1-.91,1.78,17.1,17.1,0,0,1-2.64,2.8v-5a3.63,3.63,0,0,1,1.6-1.79,1.77,1.77,0,0,1,.81-.22l.23,0a1.12,1.12,0,0,1,.91.72A2.5,2.5,0,0,1,1761.47,3092.38Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 6
                      ? activeKeyColorSymbol
                      : keyColorSymbol
                  }
                  d="M1750.48,3041H1748v5.29c-.86.35-1.66.73-2.52,1.12l-1.43.62v-3.82h-2.54l0,4.95-2.33,1c-.2.11-.63.32-.63.78v3.39s2.26-1,2.94-1.3v5.81c-.78.33-1.56.67-2.31,1-.42.21-.63.48-.63.8V3064l3-1.3v4H1744V3066l-.09-4.46,2.88-1.25,1.17-.53v3.81h2.51l0-2.36c0-.91,0-1.7,0-2.59.82-.33,1.54-.68,2.25-1a1,1,0,0,0,.72-.82c0-.58,0-1.15,0-1.74v-1.57s-2.29,1-3,1.3c0-2,0-3.91,0-5.85l2.31-1c.06,0,.64-.31.64-.8s0-1.16,0-1.74v-1.58l-3,1.31ZM1744,3057.7l-.07-5.8c1.18-.51,2.36-1,3.53-1.56l.49-.22v1.93c0,1.32,0,2.62.06,3.86Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 6
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1742.39,3094.52a9.4,9.4,0,0,1-4.73,1.08,6.62,6.62,0,0,1-4.9-2.09,8.48,8.48,0,0,1,.09-11.14,7.2,7.2,0,0,1,5.27-2.13,8,8,0,0,1,3,.55,10.9,10.9,0,0,1,3,2l2.83-4.1a13.28,13.28,0,0,0-9.16-3.48,12.39,12.39,0,0,0-9,3.65,13,13,0,0,0-.08,18.13,12.47,12.47,0,0,0,9.07,3.58q6.45,0,10.1-4.07v-8.7h-5.51Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Polygon
                  fill={
                    activeKeyGroup == keyG7 && activeKeyField == 6
                      ? activeKeyColorText
                      : keyColorText
                  }
                  points="376.91 560.43 366.11 560.43 366.11 555.14 377.47 555.14 377.47 550.33 360.64 550.33 360.64 574.84 366.11 574.84 366.11 565.24 376.91 565.24 376.91 560.43"
                />
              </G>
              <G
                x={activeKeyGroup == keyG8 ? activeKeyX : 0}
                y={activeKeyGroup == keyG8 ? activeKeyY : 0}
                onPress={() => keyPress(keyG8, 11, 150)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 11
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1863.45,2996a2.1,2.1,0,0,0,1.1-2.13,2.2,2.2,0,0,0-1-2.16,8,8,0,0,0-3.44-.52h-2.62v5.3h2.59A9,9,0,0,0,1863.45,2996Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 11
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1864.67,3001.38a10.44,10.44,0,0,0-4-.55h-3.23v5.64h3.76a8.15,8.15,0,0,0,3.51-.57,2.28,2.28,0,0,0,1.18-2.28A2.17,2.17,0,0,0,1864.67,3001.38Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 11
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1865.67,2929.24a233.63,233.63,0,0,1-74.85,74.85l41.28,71.5a316.79,316.79,0,0,0,105.07-105.07Zm4.14,79.59q-2,2.28-7.08,2.28H1852V2986.6h9.53a13.65,13.65,0,0,1,4.3.6,6.15,6.15,0,0,1,2.72,1.61,6.32,6.32,0,0,1,1.65,4.28,5,5,0,0,1-1.86,4.27,6.65,6.65,0,0,1-.88.62l-.88.4a6.44,6.44,0,0,1,3.63,2,5.7,5.7,0,0,1,1.35,3.87A6.58,6.58,0,0,1,1869.81,3008.83Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG8 && activeKeyField == 11
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1866.58,2998.38l.88-.4a6.65,6.65,0,0,0,.88-.62,5,5,0,0,0,1.86-4.27,6.32,6.32,0,0,0-1.65-4.28,6.15,6.15,0,0,0-2.72-1.61,13.65,13.65,0,0,0-4.3-.6H1852v24.51h10.73q5,0,7.08-2.28a6.58,6.58,0,0,0,1.75-4.53,5.7,5.7,0,0,0-1.35-3.87A6.44,6.44,0,0,0,1866.58,2998.38Zm-9.11-7.15h2.62a8,8,0,0,1,3.44.52,2.2,2.2,0,0,1,1,2.16,2.1,2.1,0,0,1-1.1,2.13,9,9,0,0,1-3.39.49h-2.59Zm7.27,14.67a8.15,8.15,0,0,1-3.51.57h-3.76v-5.64h3.23a10.44,10.44,0,0,1,4,.55,2.17,2.17,0,0,1,1.25,2.24A2.28,2.28,0,0,1,1864.74,3005.9Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG9 ? activeKeyX : 0}
                y={activeKeyGroup == keyG9 ? activeKeyY : 0}
                onPress={() => keyPress(keyG9, 4, 120)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG9 && activeKeyField == 4
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1900.52,2814a230.58,230.58,0,0,1-18.15,83q-4.17,9.86-9.19,19.21l71.5,41.28A313.47,313.47,0,0,0,1983.09,2814Zm42.65,69.3H1925.1V2858.8h17.68v4.86h-12.21v5.06h11v4.66h-11v5.08h12.6Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Polygon
                  fill={
                    activeKeyGroup == keyG9 && activeKeyField == 4
                      ? activeKeyColorText
                      : keyColorText
                  }
                  points="577.49 381.88 588.46 381.88 588.46 377.22 577.49 377.22 577.49 372.16 589.7 372.16 589.7 367.3 572.02 367.3 572.02 391.8 590.09 391.8 590.09 386.96 577.49 386.96 577.49 381.88"
                />
              </G>
              <G
                x={activeKeyGroup == keyG10 ? activeKeyX : 0}
                y={activeKeyGroup == keyG10 ? activeKeyY : 0}
                onPress={() => keyPress(keyG10, 9, 90)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 9
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1944.68,2655.47l-71.5,41.29q5,9.36,9.19,19.21a230.53,230.53,0,0,1,18.15,83h82.57A313.51,313.51,0,0,0,1944.68,2655.47Zm-5.55,87.32h-10.28l-2.27,5.3h-5.82l10.58-24.51h5.3l10.59,24.51h-5.83Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Polygon
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 9
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  points="577.83 246.49 583.98 246.49 580.93 239.37 577.83 246.49"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG10 && activeKeyField == 9
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1936.64,2723.58h-5.3l-10.58,24.51h5.82l2.27-5.3h10.28l2.27,5.3h5.83Zm-5.72,14.42,3.09-7.13,3,7.13Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG11 ? activeKeyX : 0}
                y={activeKeyGroup == keyG11 ? activeKeyY : 0}
                onPress={() => keyPress(keyG11, 2, 60)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG11 && activeKeyField == 2
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1857.33,2608.38h-3v14.9h3.48a8.08,8.08,0,0,0,5.76-1.89,7.19,7.19,0,0,0,2-5.51,7.35,7.35,0,0,0-2-5.56C1862.19,2609,1860.12,2608.38,1857.33,2608.38Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG11 && activeKeyField == 2
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1832.1,2537.42l-41.28,71.5a233.63,233.63,0,0,1,74.85,74.85l71.5-41.28A316.79,316.79,0,0,0,1832.1,2537.42Zm35.53,87.37q-3.42,3.33-10.43,3.33h-8.39v-24.51h8.67q6.54,0,10.06,3.21t3.51,8.92A12.05,12.05,0,0,1,1867.63,2624.79Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG11 && activeKeyField == 2
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1857.48,2603.61h-8.67v24.51h8.39q7,0,10.43-3.33a12.05,12.05,0,0,0,3.42-9.05q0-5.72-3.51-8.92T1857.48,2603.61Zm6,17.78a8.08,8.08,0,0,1-5.76,1.89h-3.48v-14.9h3c2.79,0,4.86.64,6.19,1.94a7.35,7.35,0,0,1,2,5.56A7.19,7.19,0,0,1,1863.52,2621.39Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
              <G
                x={activeKeyGroup == keyG12 ? activeKeyX : 0}
                y={activeKeyGroup == keyG12 ? activeKeyY : 0}
                onPress={() => keyPress(keyG12, 7, 30)}
              >
                <Path
                  fill={
                    activeKeyGroup == keyG12 && activeKeyField == 7
                      ? activeKeyColorBG
                      : keyColorBG
                  }
                  d="M1675.59,2491.5v82.57a230.53,230.53,0,0,1,83,18.15q9.86,4.17,19.21,9.19l41.29-71.5A313.51,313.51,0,0,0,1675.59,2491.5Zm76.41,62q-3.64,4.08-10.1,4.07a12.44,12.44,0,0,1-9.06-3.58,12.93,12.93,0,0,1,.07-18.12,12.44,12.44,0,0,1,9-3.66,13.35,13.35,0,0,1,9.17,3.48l-2.84,4.11a11.23,11.23,0,0,0-3-2,8,8,0,0,0-3-.54,7.19,7.19,0,0,0-5.27,2.12,8.48,8.48,0,0,0-.08,11.15,6.57,6.57,0,0,0,4.89,2.08,9.37,9.37,0,0,0,4.74-1.08v-6.73h5.5Z"
                  transform="translate(-1353.09 -2491.5)"
                />
                <Path
                  fill={
                    activeKeyGroup == keyG12 && activeKeyField == 7
                      ? activeKeyColorText
                      : keyColorText
                  }
                  d="M1746.5,2551.57a9.37,9.37,0,0,1-4.74,1.08,6.57,6.57,0,0,1-4.89-2.08,8.48,8.48,0,0,1,.08-11.15,7.19,7.19,0,0,1,5.27-2.12,8,8,0,0,1,3,.54,11.23,11.23,0,0,1,3,2l2.84-4.11a13.35,13.35,0,0,0-9.17-3.48,12.44,12.44,0,0,0-9,3.66,12.93,12.93,0,0,0-.07,18.12,12.44,12.44,0,0,0,9.06,3.58q6.45,0,10.1-4.07v-8.69h-5.5Z"
                  transform="translate(-1353.09 -2491.5)"
                />
              </G>
            </G>
            <Circle fill={colors.blue} cx="315" cy="314.92" r="100" />
          </G>

          {!axisStatus ? (
            <Path
              fill={colors.blue}
              d="M1986,2672.21a344.74,344.74,0,0,0-317.88-210.71q-3.75,0-7.5.09v11.17h0v663.65c-178.51-4-322.49-150.45-322.49-329.91,0-152.63,104.16-281.39,245.15-318.93a7.52,7.52,0,0,0,5.58-7.27h0a7.56,7.56,0,0,0-9.52-7.28,345,345,0,0,0,88.79,678.48q3.75,0,7.5-.09v-11.16h0V2476.6c178.51,4,322.5,150.45,322.5,329.9,0,152.65-104.18,281.41-245.17,318.94a7.52,7.52,0,0,0-5.57,7.27h0a7.56,7.56,0,0,0,9.52,7.28A345.33,345.33,0,0,0,1986,2672.21Z"
              transform="translate(-1353.09 -2491.5)"
            />
          ) : (
            <Path
              fill={colors.blue}
              origin={(315, 315)}
              rotation={axisDeg}
              d="M1986,2672.2a344.69,344.69,0,0,0-317.88-210.7q-3.75,0-7.5.09h0v11.16h0V3136.4h0c-178.51-4-322.49-150.45-322.49-329.9,0-116.67,60.86-219.38,152.51-278.08a7.49,7.49,0,0,0,2.46-10.06l-.09-.16a7.51,7.51,0,0,0-10.54-2.58,345,345,0,0,0,185.66,635.88q3.73,0,7.49-.09h0v-11.16h0V2476.6h0c178.51,4,322.5,150.46,322.5,329.91,0,152.64-104.18,281.4-245.17,318.93a7.54,7.54,0,1,0,4,14.56A345.34,345.34,0,0,0,1986,2672.2Z"
              transform="translate(-1353.09 -2491.5)"
            />
          )}

          <AnimatedIcon />
        </Svg>
      </View>
      <View style={styles.scaleSpace}></View>
      <DisplayScales ref={ref} />

      <Modal animationType="fade" transparent={true} visible={openSelect}>
        <View style={styles.selectListShadow}>
          <View style={styles.selectListWrapper}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.selectList}
            >
              {scaleList.map((scale, index) => (
                <TouchableOpacity
                  style={
                    index === scaleList.length - 1
                      ? styles.selectItemNoBorder
                      : styles.selectItem
                  }
                  key={scale.value}
                  onPress={() => selectedScale(scale.name, scale.value)}
                >
                  <Text style={styles.selectText}>{scale.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const DisplayChords = () => {
  return (
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
  );
};

export const ChordsScreen = ({
  switchCallback,
  rewardedCallback,
  disclamerCallback,
}) => {
  const [legendStatus, setLegendStatus] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [tonicSliderOpen, setTonicSliderOpen] = useState(chordsUnlocked);
  const opacity = useState(new Animated.Value(0))[0];

  function initialFadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }

  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function fadeOut() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    setTonicSliderOpen(chordsUnlocked);
    initialFadeIn();
  }, []);

  const legendToggle = () => {
    if (legendStatus == false) {
      fadeOut();
      setTimeout(function () {
        setLegendStatus(true);
        fadeIn();
      }, 150);
    } else {
      fadeOut();
      setTimeout(function () {
        setLegendStatus(false);
        fadeIn();
      }, 150);
    }
  };

  const openSelectList = () => {
    switchCallback(true);
    setOpenSelect(true);
  };

  const selectedChord = (name, value) => {
    setSelectedChordName(name);
    selectedChordVal = value;

    showChords();

    switchCallback(false);
    setOpenSelect(false);
  };

  const [selectedChordName, setSelectedChordName] = useState("Major");

  const [tonicSpacer, setTonicSpacer] = useState(0);
  const getDimentions = (event) => {
    var { width } = event.nativeEvent.layout;
    var spacerPadding = width / 2 - 55;
    setTonicSpacer(spacerPadding);
  };

  const scrollChords = useRef(null);
  let selectedIndexSaved = 0;
  const [selectedIndex, setSelectedIndex] = useState(selectedIndexSaved);
  var scrollRef = scrollRef;
  const setTonic = (index) => {
    setSelectedIndex(index);
    var offsetInterval = 110 * index;
    scrollChords.current.scrollTo({
      x: offsetInterval,
      animated: false,
    });
  };

  const notePress = (name) => {
    selectedTonic = name;

    for (let i = 0; i < cloneScale.length; i++) {
      if (selectedTonic == cloneScale[i]) {
        selectedTonicIndex = i;
      }
    }

    cloneChords = cloneScale.slice();

    var rootNote = selectedTonicIndex;
    for (var i = 0; i < rootNote; i++) cloneChords.push(cloneChords.shift());

    cloneNegativeChords = cloneNegativeScale.slice();
    for (var i = 0; i < rootNote; i++)
      cloneNegativeChords.push(cloneNegativeChords.shift());

    showChords();
    askForReview();
  };

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.navigation}>
        <TouchableOpacity disabled={openSelect} onPress={legendToggle}>
          <Info style={styles.info} />
        </TouchableOpacity>
      </View>

      <View style={styles.selectChordsWrapper}>
        {legendStatus ? (
          <Animated.View style={[styles.legendContainer, { opacity }]}>
            <Legend style={styles.legend} />

            <View style={styles.legend2Wrapper}>
              <Legend2 style={styles.legend2} />
              <TouchableOpacity
                style={styles.disclamerBtn}
                onPress={() => disclamerCallback(true)}
              >
                <Disclamer style={styles.disclamer} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : null}

        {legendStatus ? null : (
          <Animated.View style={{ opacity }}>
            <Text style={styles.selectTextExp}>
              Select a chord from a key of:
            </Text>

            <View style={styles.selectedScaleNameWrapper}>
              <Text style={styles.selectedScaleKey}>
                {selectedScaleKeySaved}
              </Text>
              <Text style={styles.selectedScaleName}>
                {selectedScaleNameSaved}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.selectInput}
              disabled={legendStatus}
              onPress={openSelectList}
            >
              <Text style={styles.selectInputText}>{selectedChordName}</Text>
              <ListArrow style={styles.selectListArrow} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      <View style={styles.chordsWrapper} onLayout={getDimentions}>
        {tonicSliderOpen ? (
          <View style={styles.scrollChords}>
            <Text style={styles.scrollChordsExpText}>Choose a tonic:</Text>

            <ScrollView
              ref={scrollChords}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollChordsWrapper}
            >
              <View
                style={(styles.scrollChordsSpace, { width: tonicSpacer })}
              />
              {positiveScaleTonics.map((note, index) => (
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={colors.lightBlue}
                  style={
                    index == selectedIndex
                      ? styles.scrollChordsNoteSelected
                      : styles.scrollChordsNote
                  }
                  key={index}
                  onPress={() => {
                    notePress(note), setTonic(index);
                  }}
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
          <TouchableHighlight
            style={styles.rewardedOpen}
            onPress={() => rewardedCallback(true)}
          >
            <Text style={styles.rewardedOpenText}>Unlock negative chords</Text>
          </TouchableHighlight>
        )}
      </View>
      <View style={styles.chordSpace}></View>
      <DisplayChords />

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
                  style={
                    index === chordList.length - 1
                      ? styles.selectItemNoBorder
                      : styles.selectItem
                  }
                  key={chord.value}
                  onPress={
                    tonicSliderOpen
                      ? () => selectedChord(chord.name, chord.value)
                      : index == 0
                      ? () => selectedChord(chord.name, chord.value)
                      : null
                  }
                >
                  <Text
                    style={
                      tonicSliderOpen
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

function MainScreen() {
  const [switchText, setSwitchText] = useState("Scales");
  const [pressAlert, setPressAlert] = useState(false);
  const [zIndex, setzIndex] = useState(false);
  const [rewardedOpen, setRewardedOpen] = useState(false);
  const [disclamerOpen, setDisclamerOpen] = useState(false);
  const [ads, setAds] = useState(false);

  const fadeAlert = useState(new Animated.Value(0))[0];

  function alertFadeIn() {
    setPressAlert(true);
    Animated.timing(fadeAlert, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function alertFadeOut() {
    Animated.timing(fadeAlert, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(function () {
      setPressAlert(false);
    }, 300);
  }

  const showAlert = {
    opacity: fadeAlert,
  };

  const opacity = useState(new Animated.Value(0))[0];

  function initialFadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }

  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function fadeOut() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    initialFadeIn();
    setTimeout(askForPermission, 1000);
  }, []);

  async function askForPermission() {
    const { granted } = await getPermissionsAsync();
    if (granted) {
      personalisedAds = true;
      setAds(true);
    } else {
      const { status } = await requestPermissionsAsync();
      if (status === "granted") {
        personalisedAds = true;
      }
      setAds(true);
    }
  }

  const switchZindex = (value) => {
    setzIndex(value);
  };

  const openRewardedModul = (value) => {
    fadeOut();
    setTimeout(function () {
      setRewardedOpen(value);
      fadeIn();
    }, 150);
  };

  const openDisclamer = (value) => {
    fadeOut();
    setTimeout(function () {
      setDisclamerOpen(value);
      fadeIn();
    }, 150);
  };

  const alertTimer = () => {
    alertFadeIn();
    setTimeout(function () {
      alertFadeOut();
    }, 2500);
  };

  const switchScreen = () => {
    if (visibleScales == false && switchText == "Scales") {
      alertTimer();
    } else {
      if (switchText == "Scales") {
        fadeOut();
        setTimeout(function () {
          showInitialChords();
          setSwitchText("Chords");
          fadeIn();
        }, 150);
      } else {
        fadeOut();
        setTimeout(function () {
          setSwitchText("Scales");
          fadeIn();
        }, 150);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      {rewardedOpen || disclamerOpen ? <WhiteBG /> : <GradientBG />}

      {!pressAlert ? null : (
        <Animated.View style={[styles.alert, showAlert]}>
          <Text style={styles.alertText}>You need to tap on a field!</Text>
        </Animated.View>
      )}

      {!rewardedOpen && !disclamerOpen && switchText == "Scales" ? (
        <Animated.View style={{ opacity, flex: 1 }}>
          <ScalesScreen switchCallback={switchZindex} />
        </Animated.View>
      ) : null}

      {!rewardedOpen && !disclamerOpen && switchText == "Chords" ? (
        <Animated.View style={{ opacity, flex: 1 }}>
          <ChordsScreen
            switchCallback={switchZindex}
            rewardedCallback={openRewardedModul}
            disclamerCallback={openDisclamer}
          />
        </Animated.View>
      ) : null}

      {!rewardedOpen && disclamerOpen ? (
        <DisclamerScreen disclamerCallback={openDisclamer} />
      ) : null}

      {rewardedOpen ? (
        <RewardedScreen rewardedCallback={openRewardedModul} />
      ) : null}

      <View style={styles.ads}>
        {ads && !rewardedOpen ? (
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={
              Platform.OS === "ios" ? admob.banners.ios : admob.banners.android
            } // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds={personalisedAds}
          />
        ) : null}
      </View>

      {rewardedOpen || disclamerOpen ? null : (
        <TouchableHighlight
          style={zIndex ? styles.switchBelow : styles.switch}
          underlayColor={colors.lightBlue}
          disabled={zIndex}
          onPress={switchScreen}
        >
          <Text style={styles.switchText}>{switchText}</Text>
        </TouchableHighlight>
      )}
    </SafeAreaView>
  );
}

export default MainScreen;
