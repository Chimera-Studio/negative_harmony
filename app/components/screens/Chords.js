import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Animated,
  Easing,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-native";
import { indexOf, times, includes, forEach, isEqual, sortBy } from "lodash";

import Bottom from "../block/Bottom";
import Legend from "../../assets/img/legend.svg";
import LegendExtra from "../../assets/img/legendExtra.svg";
import Disclamer from "../../assets/img/disclamer.svg";
import ListArrow from "../../assets/img/arrow.svg";

import useLocale from "../../locales";
import { useReview } from "../../utils";
import { actions } from "../../store/globalStore";

import colors from "../../styles/colors";
import scales_chords_style from "../../styles/scales_chords_styles";

const Chords = (props) => {
  const t = useLocale;
  const callReview = useReview;
  const dispatch = useDispatch();
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
  const screenOpacity = useRef(new Animated.Value(0)).current;
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

    const handleFindChordMatch = () => {
      let chordName = t("chords.noMatch");
      forEach(lists.chords, (c) => {
        if (isEqual(c.value, pattern)) {
          chordName = c.display;
          return;
        }
      });

      if (chordName === t("chords.noMatch")) {
        times(11, (i) => {
          forEach(lists.chords, (c) => {
            const checkPattern = c.value.map((value) => {
              const calc = value - i;
              if (calc <= -1) return Number(12 - Math.abs(calc));
              if (calc === 0) return 0;
              return calc;
            });

            if (isEqual(checkPattern, pattern)) {
              chordName = c.display;
              return;
            }

            if (isEqual(sortBy(checkPattern), sortBy(pattern))) {
              chordName = c.display;
              return;
            }
          });
        });
      }

      return chordName;
    };

    const negativeName = handleFindChordMatch();

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
    callReview(global.unlocked, global.reviewDelay);
  };

  const handleHideBanner = () => {
    dispatch(actions.showBanner(false));
  };

  const handleScreenAnimation = (to) => {
    Animated.timing(screenOpacity, {
      toValue: to,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  useEffect(() => {
    handleScreenAnimation(1);
    handleChords(selectedChord, tonic);

    return () => handleScreenAnimation(0);
  }, []);

  return (
    <Animated.View
      style={[scales_chords_style.wrapper, { opacity: screenOpacity }]}
    >
      <View style={scales_chords_style.selectChordsWrapper}>
        {props.legend ? (
          <View style={scales_chords_style.legendContainer}>
            <Legend style={scales_chords_style.legend} />

            <View style={scales_chords_style.legendExtra}>
              <LegendExtra style={{ flexShrink: 1 }} />
              <Link
                to="/info"
                underlayColor={colors.transparent}
                style={scales_chords_style.disclamerBtn}
              >
                <Disclamer style={scales_chords_style.disclamer} />
              </Link>
            </View>
          </View>
        ) : (
          <>
            <Text style={scales_chords_style.selectTextExp}>
              {t("select.chords")}
            </Text>

            <View style={scales_chords_style.selectedScaleNameWrapper}>
              <Text style={scales_chords_style.selectedScaleKey}>
                {global.scales.positive[0]}
              </Text>
              <Text style={scales_chords_style.selectedScaleName}>
                {selectedScale.name}
              </Text>
            </View>

            <TouchableOpacity
              style={scales_chords_style.selectInput}
              onPress={() => setOpenSelect(true)}
            >
              <Text style={scales_chords_style.selectInputText}>
                {selectedChord.name}
              </Text>
              <ListArrow style={scales_chords_style.selectListArrow} />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={scales_chords_style.chordsWrapper} onLayout={getDimentions}>
        {!props.displayAds || global.unlocked ? (
          <View style={scales_chords_style.scrollChords}>
            <Text style={scales_chords_style.scrollChordsExpText}>
              {t("select.tonics")}
            </Text>

            <ScrollView
              ref={scrollChords}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={scales_chords_style.scrollChordsWrapper}
            >
              <View
                style={
                  (scales_chords_style.scrollChordsSpace,
                  { width: tonicSpacer })
                }
              />
              {global.scales.positive.map((note, index) => (
                <React.Fragment key={note + index}>
                  {global.scales.positive.length - 1 !== index && (
                    <TouchableHighlight
                      activeOpacity={1}
                      underlayColor={colors.lightBlue}
                      style={
                        index === tonic
                          ? scales_chords_style.scrollChordsNoteSelected
                          : scales_chords_style.scrollChordsNote
                      }
                      key={index}
                      onPress={() => handleTonic(index)}
                    >
                      <Text
                        style={
                          index === tonic
                            ? scales_chords_style.scrollChordsNoteTextSelected
                            : scales_chords_style.scrollChordsNoteText
                        }
                      >
                        {note}
                      </Text>
                    </TouchableHighlight>
                  )}
                </React.Fragment>
              ))}
              <View
                style={
                  (scales_chords_style.scrollChordsSpace,
                  { width: tonicSpacer })
                }
              />
            </ScrollView>
          </View>
        ) : (
          <Link
            to="/rewarded"
            onPress={handleHideBanner}
            underlayColor={colors.blueTransparent}
            style={scales_chords_style.rewardedOpen}
          >
            <Text style={scales_chords_style.rewardedOpenText}>
              {t("cta.chords")}
            </Text>
          </Link>
        )}
      </View>

      <Bottom data={chords} />

      <Modal animationType="fade" transparent={true} visible={openSelect}>
        <View style={scales_chords_style.selectListWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={scales_chords_style.selectList}
            centerContent={true}
          >
            {lists.chords.map((item, index) => (
              <TouchableOpacity
                key={item.name}
                style={
                  index === lists.chords.length - 1
                    ? scales_chords_style.selectItemNoBorder
                    : scales_chords_style.selectItem
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
                      ? scales_chords_style.selectText
                      : index === 0
                      ? scales_chords_style.selectText
                      : scales_chords_style.selectDisabledText,
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
    </Animated.View>
  );
};

export default Chords;
