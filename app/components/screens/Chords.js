// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import {
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import {
  indexOf, times, includes, forEach, isEqual, sortBy,
} from 'lodash';
import Legend from '../elements/misc/Legend';
import LegendExtra from '../elements/misc/LegendExtra';
import Disclamer from '../../assets/icons/Disclamer';
import Select from '../elements/inputs/Select';
import TonicSlider from '../containers/tonic-slider/TonicSlider';
import BottomChords from '../containers/bottom/BottomChords';
import useLocale from '../../locales';
import { useReview } from '../../utils/hooks';
import { selectors } from '../../store/globalStore';
import scalesChordsStyle from '../../styles/scales_chords';
import colors from '../../styles/colors';

function Chords(): Node {
  const { t } = useLocale();
  const reviewApp = useReview();
  const global = useSelector(selectors.getGlobal, isEqual);
  const lists = useSelector((state) => ({
    scales: state.cms.scales,
    chords: state.cms.chords,
  }), isEqual);
  const [selectedChord, setSelectedChord] = useState(lists.chords[0]);
  const [chords, setChords] = useState(null);
  const [tonic, setTonic] = useState(0);
  const [openSelect, setOpenSelect] = useState(false);
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const selectedScale = global.selectedScale || lists.scales[0];

  const handleChords = (selected: Object, tonicIndex: number) => {
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
      let chordName = t('chords.no_match');
      forEach(lists.chords, (c) => {
        if (isEqual(c.value, pattern)) {
          chordName = c.display;
        }
      });

      if (chordName === t('chords.no_match')) {
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

  const handleSelect = (val: Object) => {
    setSelectedChord(val);
    handleChords(val, tonic);
    setOpenSelect(false);
  };

  const handleTonic = (index: number) => {
    setTonic(index);
    handleChords(selectedChord, index);
    reviewApp();
  };

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
          <Select
            title={t('select.chords')}
            value={selectedChord}
            options={lists.chords}
            isOpen={openSelect}
            unlocked={global.unlocked}
            onSelect={handleSelect}
            onOpen={() => setOpenSelect(true)}
            onClose={() => setOpenSelect(false)}
          >
            <View style={scalesChordsStyle.selectedScaleNameWrapper}>
              <Text style={scalesChordsStyle.selectedScaleKey}>
                {global.scales.positive[0]}
              </Text>
              <Text style={scalesChordsStyle.selectedScaleName}>
                {selectedScale.name}
              </Text>
            </View>
          </Select>
        )}
      </View>

      <TonicSlider
        scales={global.scales}
        unlocked={global.unlocked}
        value={tonic}
        onPress={handleTonic}
      />
      <BottomChords data={chords} />
    </Animated.View>
  );
}

export default Chords;
