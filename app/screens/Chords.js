import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Modal,
} from "react-native";

import ListArrow from "../assets/img/arrow.svg";

import colors from "../styles/colors";
import styles from "../styles/styles";

const Chords = () => {
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
    setOpenSelect(true);
  };

  const selectedChord = (name, value) => {
    setSelectedChordName(name);
    selectedChordVal = value;
    showChords();
    setOpenSelect(false);
  };

  const [selectedChordName, setSelectedChordName] = useState("Major");

  const [tonicSpacer, setTonicSpacer] = useState(0);
  const getDimentions = (event) => {
    let { width } = event.nativeEvent.layout;
    let spacerPadding = width / 2 - 55;
    setTonicSpacer(spacerPadding);
  };

  const scrollChords = useRef(null);
  let selectedIndexSaved = 0;
  const [selectedIndex, setSelectedIndex] = useState(selectedIndexSaved);
  let scrollRef = scrollRef;
  const setTonic = (index) => {
    setSelectedIndex(index);
    let offsetInterval = 110 * index;
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

    let rootNote = selectedTonicIndex;
    for (let i = 0; i < rootNote; i++) cloneChords.push(cloneChords.shift());

    cloneNegativeChords = cloneNegativeScale.slice();
    for (let i = 0; i < rootNote; i++)
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
              <TouchableOpacity style={styles.disclamerBtn}>
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
          <TouchableHighlight style={styles.rewardedOpen}>
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

export default Chords;
