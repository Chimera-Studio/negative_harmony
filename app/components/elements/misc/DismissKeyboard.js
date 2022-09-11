// @flow
import React from 'react';
import type { Node } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type Props = {
  children: Node,
};

function DismissKeyboard(props: Props): Node {
  const { children } = props;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}

export default DismissKeyboard;
