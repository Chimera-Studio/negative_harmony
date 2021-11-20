import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from "react-native";
import indexOf from "lodash/indexOf";
import times from "lodash/times";
import includes from "lodash/includes";
import forEach from "lodash/forEach";
import isEqual from "lodash.isequal";

import ListArrow from "../assets/img/arrow.svg";
import Bottom from "../elements/Bottom";

import { eng } from "../locales";
import { chordList } from "../utils/patterns";

import colors from "../styles/colors";
import styles from "../styles/styles";

const Chords = (props) => {
  const [selectedChord, setSelectedChord] = useState(chordList[0]);
  const [chords, setChords] = useState(null);
  const [tonicSpacer, setTonicSpacer] = useState(0);
  const [tonic, setTonic] = useState(0);
  const [openSelect, setOpenSelect] = useState(false);
  const scrollChords = useRef(null);

  const getDimentions = (event) => {
    const { width } = event.nativeEvent.layout;
    setTonicSpacer(width / 2 - 55);
  };

  const handleChords = (selected, tonicIndex) => {
    const positiveChord = [];
    const negativeChord = [];

    const shift = indexOf(
      props.scales.positiveRange,
      props.scales.positive[tonicIndex]
    );
    const shiftRangeP = props.scales.positiveRange.slice();
    times(shift, () => shiftRangeP.push(shiftRangeP.shift()));

    const shiftRangeN = props.scales.negativeRange.slice();
    times(shift, () => shiftRangeN.push(shiftRangeN.shift()));

    times(selected.value.length, (i) => {
      const obj = {
        diatonic: !includes(
          props.scales.positive,
          shiftRangeP[selected.value[i]]
        ),
        note: shiftRangeP[selected.value[i]],
      };
      const objNeg = {
        diatonic: !includes(
          props.scales.negative,
          shiftRangeN[selected.value[i]]
        ),
        note: shiftRangeN[selected.value[i]],
      };
      positiveChord.push(obj);
      negativeChord.push(objNeg);
    });

    const pattern = [];
    forEach(negativeChord, (note) => {
      pattern.push(indexOf(shiftRangeP, note.note));
    });

    times(pattern.length, (i) => {
      const subtractor = pattern[pattern.length - 1];
      const noteReset = pattern[i] - subtractor;
      if (noteReset <= -1) pattern[i] = Number(12 - Math.abs(noteReset));
      else if (noteReset === 0) pattern[i] = 0;
      else pattern[i] = Number(pattern[i] - subtractor);
    });
    pattern.reverse();

    let negativeName = "???";
    forEach(chordList, (c) => {
      if (isEqual(c.value, pattern)) negativeName = c.display;
    });

    setChords({
      positive: positiveChord,
      positiveName: selected.display,
      negative: negativeChord,
      negativeName: negativeName,
    });
  };

  const handleSelect = (val) => {
    setSelectedChord(val);
    handleChords(val, tonic);
    setOpenSelect(false);
  };

  const handleTonic = (index) => {
    setTonic(index);
    scrollChords.current.scrollTo({
      x: 110 * index,
      animated: false,
    });

    handleChords(selectedChord, index);
    // props.review();
  };

  useEffect(() => handleChords(selectedChord, tonic), []);

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
          onPress={() => setOpenSelect(true)}
        >
          <Text style={styles.selectInputText}>{selectedChord.name}</Text>
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
                <React.Fragment key={note + index}>
                  {props.scales.positive.length - 1 !== index && (
                    <TouchableHighlight
                      activeOpacity={1}
                      underlayColor={colors.lightBlue}
                      style={
                        index === tonic
                          ? styles.scrollChordsNoteSelected
                          : styles.scrollChordsNote
                      }
                      key={index}
                      onPress={() => handleTonic(index)}
                    >
                      <Text
                        style={
                          index === tonic
                            ? styles.scrollChordsNoteTextSelected
                            : styles.scrollChordsNoteText
                        }
                      >
                        {note}
                      </Text>
                    </TouchableHighlight>
                  )}
                </React.Fragment>
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

      <Bottom data={chords} />

      <Modal animationType="fade" transparent={true} visible={openSelect}>
        <View style={styles.selectListWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.selectList}
            centerContent={true}
          >
            {chordList.map((item, index) => (
              <TouchableOpacity
                key={item.name}
                style={
                  index === chordList.length - 1
                    ? styles.selectItemNoBorder
                    : styles.selectItem
                }
                onPress={
                  props.chordsUnlocked
                    ? () => handleSelect(item)
                    : index === 0
                    ? () => handleSelect(item)
                    : null
                }
              >
                <Text
                  style={
                    props.chordsUnlocked
                      ? styles.selectText
                      : index === 0
                      ? styles.selectText
                      : styles.selectDisabledText
                  }
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Chords;
