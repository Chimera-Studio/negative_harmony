// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import {
  indexOf, times, includes, forEach, isEqual, sortBy,
  map,
} from 'lodash';
import Bottom from '../containers/bottom/Bottom';
import Legend from '../elements/misc/Legend';
import LegendExtra from '../elements/misc/LegendExtra';
import Disclamer from '../../assets/icons/Disclamer';
import Arrow from '../../assets/icons/Arrow';
import useLocale from '../../locales';
import { useReview } from '../../utils/hooks';
import { selectors } from '../../store/globalStore';
import scalesChordsStyle from '../../styles/scales_chords';
import colors from '../../styles/colors';

function Chords(): Node {
  const { t } = useLocale();
  const reviewApp = useReview();
  const scrollChords = useRef(null);
  const global = useSelector(selectors.getGlobal, isEqual);
  const lists = useSelector((state) => ({
    scales: state.cms.scales,
    chords: state.cms.chords,
  }), isEqual);
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
      global.scales.positive[tonicIndex],
    );
    const shiftRangeP = global.scales.positiveRange.slice();
    times(shift, () => shiftRangeP.push(shiftRangeP.shift()));

    const shiftRangeN = global.scales.negativeRange.slice();
    times(shift, () => shiftRangeN.push(shiftRangeN.shift()));

    times(selected.value.length, (i) => {
      const obj = {
        diatonic: !includes(
          global.scales.positive,
          shiftRangeP[selected.value[i]],
        ),
        note: shiftRangeP[selected.value[i]],
      };
      const objNeg = {
        diatonic: !includes(
          global.scales.negative,
          shiftRangeN[selected.value[i]],
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
      let chordName = t('chords.noMatch');
      forEach(lists.chords, (c) => {
        if (isEqual(c.value, pattern)) {
          chordName = c.display;
        }
      });

      if (chordName === t('chords.noMatch')) {
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
      negativeName,
    });
  };

  const handleSelect = (val) => {
    setSelectedChord(val);
    handleChords(val, tonic);
    setOpenSelect(false);
  };

  const handleTonic = (index) => {
    setTonic(index);
    scrollChords.current?.scrollTo({
      x: 110 * index,
      animated: false,
    });

    handleChords(selectedChord, index);
    reviewApp();
  };

  useEffect(() => {
    const handleScreenAnimation = (to) => {
      Animated.timing(screenOpacity, {
        toValue: to,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    };

    handleScreenAnimation(1);
    handleChords(selectedChord, tonic);

    return () => handleScreenAnimation(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[scalesChordsStyle.wrapper, { opacity: screenOpacity }]}
    >
      <View style={scalesChordsStyle.selectChordsWrapper}>
        {global.showLegend ? (
          <View style={scalesChordsStyle.legendContainer}>
            <Legend style={scalesChordsStyle.legend} />

            <View style={scalesChordsStyle.legendExtra}>
              <LegendExtra style={{ flexShrink: 1 }} />
              <Link
                to="/info"
                underlayColor={colors.transparent}
                style={scalesChordsStyle.disclamerBtn}
              >
                <Disclamer style={scalesChordsStyle.disclamer} />
              </Link>
            </View>
          </View>
        ) : (
          <>
            <Text style={scalesChordsStyle.selectTextExp}>
              {t('select.chords')}
            </Text>

            <View style={scalesChordsStyle.selectedScaleNameWrapper}>
              <Text style={scalesChordsStyle.selectedScaleKey}>
                {global.scales.positive[0]}
              </Text>
              <Text style={scalesChordsStyle.selectedScaleName}>
                {selectedScale.name}
              </Text>
            </View>

            <TouchableOpacity
              style={scalesChordsStyle.selectInput}
              onPress={() => setOpenSelect(true)}
            >
              <View>
                <Text style={scalesChordsStyle.selectInputText}>
                  {selectedChord.name}
                </Text>
                <Arrow style={scalesChordsStyle.selectListArrow} />
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={scalesChordsStyle.chordsWrapper} onLayout={getDimentions}>
        {global.unlocked ? (
          <View style={scalesChordsStyle.scrollChords}>
            <Text style={scalesChordsStyle.scrollChordsExpText}>
              {t('select.tonics')}
            </Text>

            <ScrollView
              ref={scrollChords}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={scalesChordsStyle.scrollChordsWrapper}
            >
              <View
                style={
                  (scalesChordsStyle.scrollChordsSpace,
                  { width: tonicSpacer })
                }
              />
              {map(global.scales.positive, (note: string, index: number) => (
                <React.Fragment key={note + index}>
                  {global.scales.positive.length - 1 !== index && (
                    <TouchableHighlight
                      activeOpacity={1}
                      underlayColor={colors.lightBlue}
                      style={
                        index === tonic
                          ? scalesChordsStyle.scrollChordsNoteSelected
                          : scalesChordsStyle.scrollChordsNote
                      }
                      key={index}
                      onPress={() => handleTonic(index)}
                    >
                      <Text
                        style={
                          index === tonic
                            ? scalesChordsStyle.scrollChordsNoteTextSelected
                            : scalesChordsStyle.scrollChordsNoteText
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
                  (scalesChordsStyle.scrollChordsSpace,
                  { width: tonicSpacer })
                }
              />
            </ScrollView>
          </View>
        ) : (
          <Link
            to="/rewarded"
            underlayColor={colors.blueTransparent}
            style={scalesChordsStyle.rewardedOpen}
          >
            <Text style={scalesChordsStyle.rewardedOpenText}>
              {t('cta.chords')}
            </Text>
          </Link>
        )}
      </View>

      <Bottom data={chords} />

      <Modal animationType="fade" transparent visible={openSelect}>
        <View style={scalesChordsStyle.selectListWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={scalesChordsStyle.selectList}
            centerContent
          >
            {map(lists.chords, (item: Object, index: number) => (
              <TouchableOpacity
                key={item.name}
                style={
                  index === lists.chords.length - 1
                    ? scalesChordsStyle.selectItemNoBorder
                    : scalesChordsStyle.selectItem
                }
                onPress={() => handleSelect(item)}
                disabled={!global.unlocked && index !== 0}
              >
                <Text
                  style={[global.unlocked || index === 0 ? scalesChordsStyle.selectText : scalesChordsStyle.selectDisabledText,
                    {
                      color: colors.whiteGray,
                      ...(global.unlocked && { color: colors.black }),
                      ...(selectedChord.name === item.name && { color: colors.blue }),
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
}

export default Chords;
