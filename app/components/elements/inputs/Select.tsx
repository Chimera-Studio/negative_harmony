import React from 'react';
import {
  Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import Arrow from '@assets/icons/Arrow';
import colors from '@styles/colors';
import selectStyle from '@styles/select';
import map from 'lodash/map';

export type Option = Object & {
  name: string,
};

type Props = {
  children?: any,
  title?: string,
  value: Option | undefined,
  options: Option[],
  isOpen: boolean,
  onSelect: (option: Option) => void,
  onOpen: () => void,
  onClose: () => void,
};

function Select(props: Props) {
  const handleSelect = (option: Option) => {
    props.onSelect(option);
  };

  return (
    <>
      <View style={{ width: '100%' }}>
        <Text style={selectStyle.selectTextExp}>
          {props.title}
        </Text>
        {props.children}

        <TouchableOpacity
          activeOpacity={0.6}
          style={selectStyle.selectInput}
          onPress={() => props.onOpen()}
        >
          <Text style={selectStyle.selectInputText}>
            {props.value?.name}
          </Text>
          <Arrow style={selectStyle.selectListArrow} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        visible={props.isOpen}
        onRequestClose={props.onClose}
        statusBarTranslucent
        transparent
      >
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View style={selectStyle.selectListOverlay} />
        </TouchableWithoutFeedback>
        <View style={selectStyle.selectListWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={selectStyle.selectList}
          >
            {map(props.options, (option: Option, index) => (
              <TouchableOpacity
                key={option.name}
                style={
                  index === props.options.length - 1
                    ? selectStyle.selectItemNoBorder
                    : selectStyle.selectItem
                }
                onPress={() => handleSelect(option)}
              >
                <Text
                  style={[selectStyle.selectText,
                    {
                      color: colors.black,
                      ...(props.value?.name === option.name && { color: colors.blue }),
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
