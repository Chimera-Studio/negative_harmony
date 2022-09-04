// @flow
import React from 'react';
import type { Node } from 'react';
import {
  Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { map } from 'lodash';
import Arrow from '../../../assets/icons/Arrow';
import scalesChordsStyle from '../../../styles/scales_chords';
import colors from '../../../styles/colors';

export type Option = {
  ...Object,
  name: string,
};

type Props = {
  children?: any,
  title?: string,
  value: Option,
  options: Option[],
  isOpen: boolean,
  unlocked: boolean,
  onSelect: Function,
  onOpen: Function,
  onClose: Function,
};

function Select(props: Props): Node {
  const handleSelect = (option: Option) => {
    props.onSelect(option);
  };

  return (
    <>
      <View style={{ width: '100%' }}>
        <Text style={scalesChordsStyle.selectTextExp}>
          {props.title}
        </Text>
        {props.children}

        <TouchableOpacity
          activeOpacity={0.6}
          style={scalesChordsStyle.selectInput}
          onPress={() => props.onOpen()}
        >
          <Text style={scalesChordsStyle.selectInputText}>
            {props.value.name}
          </Text>
          <Arrow style={scalesChordsStyle.selectListArrow} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        visible={props.isOpen}
        onRequestClose={props.onClose}
        transparent
      >
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View style={scalesChordsStyle.selectListOverlay} />
        </TouchableWithoutFeedback>
        <View style={scalesChordsStyle.selectListWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={scalesChordsStyle.selectList}
          >
            {map(props.options, (option: Option, index) => (
              <TouchableOpacity
                key={option.name}
                style={
                  index === props.options.length - 1
                    ? scalesChordsStyle.selectItemNoBorder
                    : scalesChordsStyle.selectItem
                }
                onPress={() => handleSelect(option)}
                disabled={!props.unlocked && index !== 0}
              >
                <Text
                  style={[props.unlocked || index === 0 ? scalesChordsStyle.selectText : scalesChordsStyle.selectDisabledText,
                    {
                      color: colors.whiteGray,
                      ...(props.unlocked && { color: colors.black }),
                      /* $FlowFixMe */
                      ...(props.value.name === option.name && { color: colors.blue }),
                    },
                  ]}
                >
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

export default Select;
