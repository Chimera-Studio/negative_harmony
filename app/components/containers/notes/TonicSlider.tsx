import React, { useRef, useState } from 'react';
import {
  ScrollView, Text, TouchableHighlight, View,
} from 'react-native';
import GridNote from '@components/elements/inputs/GridNote';
import useLocale from '@locales';
import chordsStyle from '@styles/chords';
import colors from '@styles/colors';
import map from 'lodash/map';

type Props = {
  scales: {
    positive: string[],
    negative: string[],
  },
  value: number,
  onPress: (index: number) => void,
};

function TonicSlider(props: Props) {
  const { t } = useLocale();
  const [tonicSpacer, setTonicSpacer] = useState(0);
  const scrollChordsRef = useRef<ScrollView | null>(null);

  const getDimensions = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setTonicSpacer(width / 2 - 55);
  };

  const handlePress = (index: number) => {
    scrollChordsRef.current?.scrollTo({
      x: 110 * index,
      animated: false,
    });
    props.onPress(index);
  };

  return (
    <View style={chordsStyle.chordsWrapper} onLayout={getDimensions}>
      <View style={chordsStyle.scrollChords}>
        <Text style={chordsStyle.scrollChordsExpText}>
          {t('select.tonics')}
        </Text>

        <ScrollView
          ref={scrollChordsRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={chordsStyle.scrollChordsWrapper}
          horizontal
        >
          <View style={[chordsStyle.scrollChordsSpace, { width: tonicSpacer }]} />
          {map(props.scales.positive, (note: string, index: number) => (
            <React.Fragment key={note + index}>
              {props.scales.positive.length - 1 !== index && (
                <TouchableHighlight
                  style={[chordsStyle.scrollChordsNote, index === props.value && chordsStyle.scrollChordsNoteSelected]}
                  underlayColor={colors.lightBlue}
                  activeOpacity={1}
                  onPress={() => handlePress(index)}
                >
                  <GridNote
                    note={note}
                    selected={index === props.value}
                    fontSize={20}
                  />
                </TouchableHighlight>
              )}
            </React.Fragment>
          ))}
          <View style={[chordsStyle.scrollChordsSpace, { width: tonicSpacer }]} />
        </ScrollView>
      </View>
    </View>
  );
}

export default TonicSlider;
