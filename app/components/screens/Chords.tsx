import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, Easing, Text, View,
} from 'react-native';
import { Link } from 'react-router-native';
import Disclaimer from '@assets/icons/Disclaimer';
import BottomChords from '@components/containers/bottom/BottomChords';
import TonicSlider from '@components/containers/notes/TonicSlider';
import Select from '@components/elements/inputs/Select';
import Legend from '@components/elements/misc/Legend';
import LegendExtra from '@components/elements/misc/LegendExtra';
import useLocale from '@locales';
import { selectors } from '@store/globalStore';
import chordsStyle from '@styles/chords';
import colors from '@styles/colors';
import legendStyle from '@styles/legend';
import scalesStyle from '@styles/scales';
import selectStyle from '@styles/select';
import { useAppSelector, useReview } from '@utils/hooks';
import { chordList, scaleList } from '@utils/patterns';
import {
  forEach, get, includes, indexOf, isEqual, sortBy, times,
} from 'lodash';
import type { Note } from '@utils/hooks';

export type ChordData = {
  positive: Note[]
  positiveName: string
  negative: Note[]
  negativeName: string
};

function Chords() {
  const { t } = useLocale();
  const reviewApp = useReview();
  const global = useAppSelector(selectors.getGlobal, isEqual);
  const lists = { scales: scaleList, chords: chordList };
  const [selectedChord, setSelectedChord] = useState(lists.chords[0]);
  const [chords, setChords] = useState<ChordData | null>(null);
  const [tonic, setTonic] = useState(0);
  const [openSelect, setOpenSelect] = useState(false);
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const selectedScale = global.selectedScale || lists.scales[0];

  const handleChords = (selected: Object | undefined, tonicIndex: number) => {
    const positiveChord: any = [];
    const negativeChord: any = [];
    const positiveRange = get(global, 'scales.positiveRange', []);
    const negativeRange = get(global, 'scales.negativeRange', []);

    const shift = indexOf(
      positiveRange,
      get(global, `scales.positive[${tonicIndex}]`),
    );
    const shiftRangeP = positiveRange.slice();
    // @ts-ignore
    times(shift, () => shiftRangeP.push(shiftRangeP.shift()));

    const shiftRangeN = negativeRange.slice();
    // @ts-ignore
    times(shift, () => shiftRangeN.push(shiftRangeN.shift()));

    // @ts-ignore
    times(selected.value.length, (i) => {
      const obj = {
        diatonic: !includes(
          // @ts-ignore
          global.scales.positive,
          // @ts-ignore
          shiftRangeP[selected.value[i]],
        ),
        // @ts-ignore
        note: shiftRangeP[selected.value[i]],
      };
      const objNeg = {
        diatonic: !includes(
          // @ts-ignore
          global.scales.negative,
          // @ts-ignore
          shiftRangeN[selected.value[i]],
        ),
        // @ts-ignore
        note: shiftRangeN[selected.value[i]],
      };
      positiveChord.push(obj);
      negativeChord.push(objNeg);
    });

    const pattern: any = [];
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
      positiveName: get(selected, 'display', ''),
      negative: negativeChord,
      negativeName,
    });
  };

  useEffect(() => {
    const handleScreenAnimation = (to: any) => {
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
    setSelectedChord(val as any);
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
      style={[chordsStyle.wrapper, { opacity: screenOpacity }]}
    >
      <View style={selectStyle.selectChordsWrapper}>
        {global.showLegend ? (
          <View style={legendStyle.legendContainer}>
            <Legend style={legendStyle.legend} />

            <View style={legendStyle.legendExtra}>
              <LegendExtra style={{ flexShrink: 1 }} />
              <Link
                to="/info"
                underlayColor={colors.transparent}
                style={legendStyle.disclaimerBtn}
              >
                <Disclaimer style={legendStyle.disclaimer} />
              </Link>
            </View>
          </View>
        ) : (
          <Select
            title={t('select.chords')}
            value={selectedChord}
            options={lists.chords}
            isOpen={openSelect}
            onSelect={handleSelect}
            onOpen={() => setOpenSelect(true)}
            onClose={() => setOpenSelect(false)}
          >
            <View style={scalesStyle.selectedScaleNameWrapper}>
              <Text style={scalesStyle.selectedScaleKey}>
                {get(global, 'scales.positive[0]', '')}
              </Text>
              <Text style={scalesStyle.selectedScaleName}>
                {selectedScale?.name}
              </Text>
            </View>
          </Select>
        )}
      </View>

      <TonicSlider
        scales={global.scales as any}
        value={tonic}
        onPress={handleTonic}
      />
      <BottomChords data={chords} />
    </Animated.View>
  );
}

export default Chords;
