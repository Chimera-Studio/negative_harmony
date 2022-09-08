// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { includes } from 'lodash';
import { secondsToMilliseconds } from 'date-fns';
import Pause from '../../../assets/icons/Pause';
import Play from '../../../assets/icons/Play';
import useLocale from '../../../locales';
import { useSoundChords } from '../../../utils/hooks';
import chordsStyle from '../../../styles/chords';
import colors from '../../../styles/colors';

export type ChordPlaying = 'positive'|'negative'|'both';

type Props = {
  data: any,
  negativeChordName: string,
  negativeChordNote: string,
};

function ChordSounds(props: Props): Node {
  const { t } = useLocale();
  const chords = useSoundChords();
  const [chordPlaying, setChordPlaying] = useState<?ChordPlaying>(null);
  const { data } = props;

  useEffect(() => {
    let timeOutId;

    const resetPlay = () => {
      timeOutId = setTimeout(() => {
        chords.chordsPause();
        setChordPlaying(null);
      }, secondsToMilliseconds(5));
    };

    if (chordPlaying === 'both') {
      chords.chordsPlay(data.positive, 'positive');
      chords.chordsPlay(data.negative, 'negative');
      resetPlay();
    }

    if (chordPlaying && includes(['negative', 'positive'], chordPlaying)) {
      chords.chordsPlay(data[chordPlaying], chordPlaying);
      resetPlay();
    }

    return () => clearTimeout(timeOutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chordPlaying]);

  const handlePlayPause = (type: ChordPlaying) => {
    if (chordPlaying === type) {
      chords.chordsPause();
      setChordPlaying(null);

      return;
    }

    if (chordPlaying) {
      chords.chordsPause();
    }

    setChordPlaying(type);
  };

  if (!data) return;

  return (
    <View style={chordsStyle.soundButtonWrapper}>
      <TouchableHighlight
        onPress={() => handlePlayPause('both')}
        underlayColor={colors.blueTransparent}
        style={chordsStyle.soundButtonBoth}
      >
        <>
          {chordPlaying === 'both' ? (
            <Pause fill={colors.white} style={chordsStyle.soundButtonIcon} />
          ) : (
            <Play fill={colors.white} style={chordsStyle.soundButtonIcon} />
          )}
          <Text
            style={[
              chordsStyle.soundButtonText,
              { fontSize: 16 },
            ]}
          >
            {t('chords.play_both')}
          </Text>
        </>
      </TouchableHighlight>
      <View style={chordsStyle.soundButtonSplitWrapper}>
        <TouchableHighlight
          onPress={() => handlePlayPause('positive')}
          underlayColor={colors.blueTransparent}
          style={chordsStyle.soundButton}
        >
          <>
            {chordPlaying === 'positive' ? (
              <Pause fill={colors.white} style={chordsStyle.soundButtonIcon} />
            ) : (
              <Play fill={colors.white} style={chordsStyle.soundButtonIcon} />
            )}
            <Text
              style={[
                chordsStyle.soundButtonText,
                { fontSize: 18 },
              ]}
            >
              {data.positive[0].note}
            </Text>
            <Text
              style={[
                chordsStyle.soundButtonText,
                { fontSize: 12 },
              ]}
            >
              {data.positiveName}
            </Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handlePlayPause('negative')}
          underlayColor={colors.blueTransparent}
          style={chordsStyle.soundButton}
        >
          <>
            {chordPlaying === 'negative' ? (
              <Pause fill={colors.white} style={chordsStyle.soundButtonIcon} />
            ) : (
              <Play fill={colors.white} style={chordsStyle.soundButtonIcon} />
            )}
            <Text
              style={[
                chordsStyle.soundButtonText,
                { fontSize: 18 },
              ]}
            >
              {props.negativeChordNote}
            </Text>
            <Text
              style={[
                chordsStyle.soundButtonText,
                { fontSize: 12 },
              ]}
            >
              {props.negativeChordName}
            </Text>
          </>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default ChordSounds;
