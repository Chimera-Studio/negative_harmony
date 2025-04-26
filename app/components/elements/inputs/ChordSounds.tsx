import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Pause from '@assets/icons/Pause';
import Play from '@assets/icons/Play';
import useLocale from '@locales';
import chordsStyle from '@styles/chords';
import colors from '@styles/colors';
import { ChordPlaying, useSoundChords } from '@utils/hooks';
import { secondsToMilliseconds } from 'date-fns';
import type { ChordData } from '@components/screens/Chords';

type Props = {
  data: ChordData,
  negativeChordName: string,
  negativeChordNote: string,
};

function ChordSounds(props: Props) {
  const { t } = useLocale();
  const chords = useSoundChords();
  const [chordPlaying, setChordPlaying] = useState<ChordPlaying | null>(null);
  const timeoutRef = useRef<number>(undefined);
  const { data } = props;

  useEffect(() => {
    chords.switchChords({
      positive: data.positive,
      negative: data.negative,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.positive, data.negative]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      chords.pause();
      setChordPlaying(null);
    }, secondsToMilliseconds(5));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chordPlaying]);

  const handlePlayPause = (type: ChordPlaying) => {
    if (chordPlaying) chords.pause();
    if (chordPlaying === type) {
      setChordPlaying(null);

      return;
    }

    chords.play(type);
    setChordPlaying(type);
  };

  return (
    <View style={chordsStyle.soundButtonWrapper}>
      <TouchableHighlight
        onPress={() => handlePlayPause(ChordPlaying.both)}
        underlayColor={colors.blueTransparent}
        style={chordsStyle.soundButtonBoth}
      >
        <View style={chordsStyle.soundButtonContainer}>
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
        </View>
      </TouchableHighlight>
      <View style={chordsStyle.soundButtonSplitWrapper}>
        <TouchableHighlight
          onPress={() => handlePlayPause(ChordPlaying.positive)}
          underlayColor={colors.blueTransparent}
          style={chordsStyle.soundButton}
        >
          <View style={chordsStyle.soundButtonContainer}>
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
              {data.positive[0]?.note}
            </Text>
            <Text
              style={[
                chordsStyle.soundButtonText,
                { fontSize: 12 },
              ]}
            >
              {data.positiveName}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handlePlayPause(ChordPlaying.negative)}
          underlayColor={colors.blueTransparent}
          style={chordsStyle.soundButton}
        >
          <View style={chordsStyle.soundButtonContainer}>
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
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default ChordSounds;
