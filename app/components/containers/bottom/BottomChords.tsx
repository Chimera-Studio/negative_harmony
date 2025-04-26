import React from 'react';
import { Text, View } from 'react-native';
import ChordSounds from '@components/elements/inputs/ChordSounds';
import bottomStyle from '@styles/bottom';
import colors from '@styles/colors';
import { includes, map } from 'lodash';
import type { ChordData } from '@components/screens/Chords';
import type { Note } from '@utils/hooks';

type Props = {
  data: ChordData | null,
};

function BottomChords(props: Props) {
  const { data } = props;

  const handleNegativeChordNote = (chord: string, notes: Note[]) => {
    if (includes(['m6', '6 chord', 'dim7'], chord)) {
      return notes[notes.length - 2]?.note;
    }

    return notes[notes.length - 1]?.note;
  };

  const handleNegativeChordName = (chordP: string, chordN: string) => {
    if (chordP === '5 chord') return '-' + chordP;
    if (chordP === 'dim7') return '13♭5sus';
    if (chordP === '7sus4') return 'maj7♭5';

    return chordN;
  };

  const negativeChordNote = data ? handleNegativeChordNote(data.positiveName, data.negative) : '';
  const negativeChordName = data ? handleNegativeChordName(data.positiveName, data.negativeName) : '';

  return (
    <>
      {data && (
        <ChordSounds
          data={data}
          negativeChordNote={negativeChordNote || ''}
          negativeChordName={negativeChordName}
        />
      )}
      <View style={bottomStyle.space}>
        {data && (
          <View style={bottomStyle.wrapper}>
            <View style={[bottomStyle.chord, { alignItems: 'flex-end' }]}>
              <View style={[bottomStyle.chordName, { alignItems: 'flex-end' }]}>
                <Text style={[bottomStyle.tonic, { color: colors.positiveText }]}>
                  {data.positive[0]?.note}
                </Text>
                <Text style={[bottomStyle.name, { color: colors.positiveText }]}>
                  {data.positiveName}
                </Text>
              </View>

              <View style={[bottomStyle.notes, { alignItems: 'flex-end' }]}>
                {map(data.positive, (chord, index) => (
                  <Text
                    key={index}
                    style={[
                      bottomStyle.notesText,
                      [
                        chord.diatonic
                          ? { color: colors.red }
                          : { color: colors.negativeText },
                      ],
                    ]}
                  >
                    {chord.note}
                  </Text>
                ))}
              </View>
            </View>

            <View style={bottomStyle.axis} />

            <View style={[bottomStyle.chord, { alignItems: 'flex-start' }]}>
              <View style={[bottomStyle.chordName, { alignItems: 'flex-start' }]}>
                <Text style={[bottomStyle.tonic, { color: colors.negativeText }]}>
                  {negativeChordNote}
                </Text>
                <Text
                  style={[
                    bottomStyle.name,
                    {
                      color:
                        data.positiveName === '5 chord'
                          ? colors.red
                          : colors.negativeText,
                    },
                  ]}
                >
                  {negativeChordName}
                </Text>
              </View>

              <View style={[bottomStyle.notes, { alignItems: 'flex-start' }]}>
                {map(data.negative, (chord, index) => (
                  <Text
                    key={index}
                    style={[
                      bottomStyle.notesText,
                      [
                        chord.diatonic
                          ? { color: colors.red }
                          : { color: colors.negativeText },
                      ],
                    ]}
                  >
                    {chord.note}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
}

export default BottomChords;
