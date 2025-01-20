/* eslint-disable no-console */
import React from 'react';
import {
  SafeAreaView, ScrollView, StyleSheet, Text,
} from 'react-native';
import Emoji from '@assets/icons/Emoji';
import WhiteBackground from '@components/elements/backgrounds/WhiteBackground';
import Hr from '@components/elements/misc/Hr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Font } from '@styles';
import colors from '@styles/colors';
import { deviceInfo } from '@utils';

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.white,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 120,
    maxWidth: 500,
    minHeight: 500,
    position: 'relative',
    width: '90%',
  },
  scrollDeviceContainer: {
    flexGrow: 1,
    minHeight: '100%',
    width: '100%',
  },
  title: {
    color: colors.blue,
    fontFamily: Font.bold,
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: colors.black,
    fontFamily: Font.regular,
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'left',
  },
  emoji: {
    height: 14,
    width: 14,
  },
  error: {
    color: colors.red,
    fontFamily: Font.regular,
    fontSize: 12,
    marginVertical: 12,
    textAlign: 'left',
  },
});

type Props = {
  children: any,
};

type State = {
  hasError: boolean,
  error: Error | null
  stacktrace: string
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      stacktrace: '',
    };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true, error: null, stacktrace: '' };
  }

  override componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    this.setState({ error, stacktrace: errorInfo.componentStack });
    console.log('----ERROR----');
    console.error(error);
    console.log('-------------');
    console.error(errorInfo.componentStack);
    console.log('----ERROR----');

    AsyncStorage.clear().catch(() => {});
  }

  override render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollDeviceContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SafeAreaView style={styles.safe}>
          <WhiteBackground />
          <Text style={styles.title}>Oops...</Text>
          <Text style={styles.text}>
            It seems you encountered an error while using the app. Sorry about that.{' '}
            <Emoji style={styles.emoji} fill={colors.blue} />
          </Text>
          <Text style={styles.text}>
            We are working hard to fix it and we ask for your patients, but if it happens again you can contact the team directly at:
          </Text>
          <Text
            selectable
            style={[styles.text, { color: colors.blue, marginTop: -10 }]}
          >
            chimerastudiotm@gmail.com
          </Text>
          <Text style={styles.text}>
            You can try closing and reopening the app.
          </Text>
          {!deviceInfo.isRealDevice && (
            <>
              <Hr />
              {this.state.error && (
                <Text style={styles.error}>
                  Name: {this.state.error?.name}{'\n'}
                  Message: {this.state.error?.message}
                </Text>
              )}
              <Hr />
              {this.state.stacktrace && (
                <Text style={styles.error}>
                  Stacktrace: {this.state.stacktrace}
                </Text>
              )}
            </>
          )}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default ErrorBoundary;
