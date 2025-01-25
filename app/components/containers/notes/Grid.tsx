import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import GridNote from '@components/elements/inputs/GridNote';
import colors from '@styles/colors';
import gridStyle from '@styles/grid';
import { gridScale, musicScale } from '@utils/patterns';
import chunk from 'lodash/chunk';
import map from 'lodash/map';
import type { ActiveKey } from '@store/globalStore';
import type { ScaleKeys } from '@utils/patterns';

type Props = {
  activeKey: ActiveKey,
  handleKey: (group: ScaleKeys, noteIndex: number, angle: number) => void,
};

function Grid(props: Props) {
  const handlePress = ({ group, noteIndex, angle }: typeof gridScale[0]) => {
    props.handleKey(group, noteIndex, angle);
  };

  return (
    <View style={gridStyle.gridWrapper}>
      {map(chunk(gridScale, 4), (group, index) => (
        <View key={index} style={gridStyle.gridRow}>
          {map(group, (note) => {
            const isSelected = props.activeKey.group === note.group;

            return (
              <TouchableHighlight
                key={note.group}
                style={[
                  gridStyle.noteBtn,
                  isSelected && gridStyle.noteBtnSelected,
                ]}
                underlayColor={colors.lightBlue}
                onPress={() => handlePress(note)}
              >
                <GridNote note={musicScale[note.noteIndex]} selected={isSelected} />
              </TouchableHighlight>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default Grid;
