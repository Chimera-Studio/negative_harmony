import React from 'react';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import DismissKeyboard from './DismissKeyboard';
import { isApple } from '../../../utils';

type Props = {
  children: ReactNode,
};

function AvoidingDismissKeyboard(props: Props) {
  return (
    <KeyboardAvoidingView
      behavior={isApple ? 'padding' : 'height'}
      keyboardVerticalOffset={20}
      style={{ flex: 1 }}
    >
      <DismissKeyboard>{props.children}</DismissKeyboard>
    </KeyboardAvoidingView>
  );
}

export default AvoidingDismissKeyboard;
