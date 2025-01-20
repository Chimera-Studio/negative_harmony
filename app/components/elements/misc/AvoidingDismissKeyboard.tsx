import React from 'react';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { isApple } from '@utils';
import DismissKeyboard from './DismissKeyboard';

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
