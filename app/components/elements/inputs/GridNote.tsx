import React from 'react';
import { Text, View } from 'react-native';
import gridStyle from '@styles/grid';
import { symbolFlat, symbolSharp } from '@utils/patterns';

type Props = {
  fontSize?: number
  note: string,
  selected: boolean
};

function GridNote(props: Props) {
  const noteStyle = [
    gridStyle.noteTxt,
    props.selected && gridStyle.noteTxtSelected,
    !!props.fontSize && { fontSize: props.fontSize },
  ];
  const noteSymbol = [
    gridStyle.noteSymbol,
    props.selected && gridStyle.noteSymbolSelected,
    !!props.fontSize && { fontSize: props.fontSize + 2 },
  ];

  if (!props.note.includes(symbolSharp) || !props.note.includes(symbolFlat)) {
    return (<Text style={noteStyle}>{props.note}</Text>);
  }

  const [sharp, flat] = props.note.split(' ');

  return (
    <View style={gridStyle.noteWrapper}>
      <View style={[gridStyle.noteTxtWrapper, { marginLeft: -5 }]}>
        <Text style={noteStyle}>{sharp.replace(symbolSharp, '')}</Text>
        <Text style={noteSymbol}>{symbolSharp}</Text>
      </View>
      <View style={[gridStyle.noteTxtWrapper, { marginLeft: 15, marginTop: -5 }]}>
        <Text style={noteStyle}>{flat.replace(symbolFlat, '')}</Text>
        <Text style={noteSymbol}>{symbolFlat}</Text>
      </View>
    </View>
  );
}

export default GridNote;
