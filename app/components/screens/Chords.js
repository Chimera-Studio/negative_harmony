import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import { Link } from "react-router-native";
import { indexOf, times, includes, forEach, isEqual } from "lodash";

import Bottom from "../elements/Bottom";
import Legend from "../../assets/img/legend.svg";
import LegendExtra from "../../assets/img/legendExtra.svg";
import Disclamer from "../../assets/img/disclamer.svg";
import ListArrow from "../../assets/img/arrow.svg";

import useLocale from "../../locales";

import colors from "../../styles/colors";
import styles from "../../styles/styles";

const Chords = (props) => {
  const t = useLocale;
  const scrollChords = useRef(null);
  const global = useSelector((state) => state.global);
  const lists = useSelector((state) => {
    return {
      scales: state.cms.scales,
      chords: state.cms.chords,
    };
  });
  const [selectedChord, setSelectedChord] = useState(lists.chords[0]);
  const [chords, setChords] = useState(null);
  const [tonic, setTonic] = useState(0);
  const [tonicSpacer, setTonicSpacer] = useState(0);
  const [openSelect, setOpenSelect] = useState(false);
  const selectedScale = global.selectedScale || lists.scales[0];

  const getDimentions = (event) => {
    const { width } = event.nativeEvent.layout;
    setTonicSpacer(width / 2 - 55);
  };

  const handleChords = (selected, tonicIndex) => {
    const positiveChord = [];
    const negativeChord = [];

    const shift = indexOf(
      global.scales.positiveRange,
      global.scales.positive[tonicIndex]
    );
    const shiftRangeP = global.scales.positiveRange.slice();
    times(shift, () => shiftRangeP.push(shiftRangeP.shift()));

    const shiftRangeN = global.scales.negativeRange.slice();
    times(shift, () => shiftRangeN.push(shiftRangeN.shift()));

    times(selected.value.length, (i) => {
      const obj = {
        diatonic: !includes(
          global.scales.positive,
          shiftRangeP[selected.value[i]]
        ),
        note: shiftRangeP[selected.value[i]],
      };
      const objNeg = {
        diatonic: !includes(
          global.scales.negative,
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
    forEach(lists.chords, (c) => {
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
        {props.legend ? (
          <View style={styles.legendContainer}>
            <Legend style={styles.legend} />

            <View style={styles.legendExtra}>
              <LegendExtra style={{ flexShrink: 1 }} />
              <Link
                to="/info"
                underlayColor={colors.transparent}
                style={styles.disclamerBtn}
              >
                <Disclamer style={styles.disclamer} />
              </Link>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.selectTextExp}>{t("select.chords")}</Text>

            <View style={styles.selectedScaleNameWrapper}>
              <Text style={styles.selectedScaleKey}>
                {global.scales.positive[0]}
              </Text>
              <Text style={styles.selectedScaleName}>{selectedScale.name}</Text>
            </View>

            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setOpenSelect(true)}
            >
              <Text style={styles.selectInputText}>{selectedChord.name}</Text>
              <ListArrow style={styles.selectListArrow} />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.chordsWrapper} onLayout={getDimentions}>
        {global.unlocked ? (
          <View style={styles.scrollChords}>
            <Text style={styles.scrollChordsExpText}>{t("select.tonics")}</Text>

            <ScrollView
              ref={scrollChords}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollChordsWrapper}
            >
              <View
                style={(styles.scrollChordsSpace, { width: tonicSpacer })}
              />
              {global.scales.positive.map((note, index) => (
                <React.Fragment key={note + index}>
                  {global.scales.positive.length - 1 !== index && (
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
          <Link
            to="/rewarded"
            underlayColor={colors.blueTransparent}
            style={styles.rewardedOpen}
          >
            <Text style={styles.rewardedOpenText}>{t("cta.chords")}</Text>
          </Link>
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
            {lists.chords.map((item, index) => (
              <TouchableOpacity
                key={item.name}
                style={
                  index === lists.chords.length - 1
                    ? styles.selectItemNoBorder
                    : styles.selectItem
                }
                onPress={
                  global.unlocked
                    ? () => handleSelect(item)
                    : index === 0
                    ? () => handleSelect(item)
                    : null
                }
              >
                <Text
                  style={[
                    global.unlocked
                      ? styles.selectText
                      : index === 0
                      ? styles.selectText
                      : styles.selectDisabledText,
                    {
                      color:
                        selectedChord.name === item.name
                          ? colors.blue
                          : global.unlocked
                          ? colors.black
                          : colors.whiteGray,
                    },
                  ]}
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
