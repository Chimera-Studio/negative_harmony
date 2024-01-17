import React, { useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Link } from 'react-router-native';
import { map } from 'lodash';
import useLocale from '../../../locales';
import colors from '../../../styles/colors';
import scalesChordsStyle from '../../../styles/scales_chords';

type Props = {
  scales: {
    positive: string[],
    negative: string[],
  },
  unlocked: boolean,
  value: number,
  onPress: (index: number) => void,
};

function TonicSlider(props: Props) {
  const { t } = useLocale();
  const [tonicSpacer, setTonicSpacer] = useState(0);
  const scrollChordsRef = useRef<ScrollView | null>(null);

  const getDimentions = (event: any) => {
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
    <View style={scalesChordsStyle.chordsWrapper} onLayout={getDimentions}>
      {props.unlocked ? (
        <View style={scalesChordsStyle.scrollChords}>
          <Text style={scalesChordsStyle.scrollChordsExpText}>
            {t('select.tonics')}
          </Text>

          <ScrollView
            ref={scrollChordsRef}
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
            {map(props.scales.positive, (note: string, index: number) => (
              <React.Fragment key={note + index}>
                {props.scales.positive.length - 1 !== index && (
                  <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={colors.lightBlue}
                    style={
                          index === props.value
                            ? scalesChordsStyle.scrollChordsNoteSelected
                            : scalesChordsStyle.scrollChordsNote
                        }
                    onPress={() => handlePress(index)}
                  >
                    <Text
                      style={
                            index === props.value
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
  );
}

export default TonicSlider;
