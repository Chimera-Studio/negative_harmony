/* eslint-disable no-console */
import React from 'react';
import {
  SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import CodePush from 'react-native-code-push';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Emoji from '../../../assets/icons/Emoji';
import { Font } from '../../../styles';
import colors from '../../../styles/colors';
import { deviceInfo } from '../../../utils';
import WhiteBackground from '../../elements/backgrounds/WhiteBackground';
import Hr from '../../elements/misc/Hr';

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
  button: {
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: 30,
    display: 'flex',
    height: 60,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    paddingHorizontal: 40,
  },
  buttonText: {
    color: colors.white,
    fontFamily: Font.bold,
    fontSize: 16,
    textAlign: 'center',
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
  }

  handleRestart = async () => {
    await AsyncStorage.clear();
    CodePush.restartApp();
  };

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
            You can reopen the app manually or by pressing the button below.
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
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={this.handleRestart}
          >
            <Text style={styles.buttonText}>Restart the App</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default ErrorBoundary;
