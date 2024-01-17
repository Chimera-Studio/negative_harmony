import React from 'react';
import type { ReactNode } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type Props = {
  children: ReactNode,
};

function DismissKeyboard(props: Props) {
  const { children } = props;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}

export default DismissKeyboard;
