// @flow
import React from 'react';
import type { ComponentType, Node } from 'react';
import {
  SafeAreaView, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons';
import WhiteBackground from '../../elements/backgrounds/WhiteBackground';
import colors from '../../../styles/colors';
import type { ReduxState } from '../../../types';

const styles: Object = StyleSheet.create({
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
  title: {
    color: colors.blue,
    fontFamily: 'NegativeHarmony-Bold',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: colors.black,
    fontFamily: 'NegativeHarmony',
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'left',
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
    fontFamily: 'NegativeHarmony-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

type Props = {
  children: any,
  store: {
    dispatch: Function,
    getState: () => ReduxState,
  },
}

type State = {
  hasError: boolean,
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: { componentStack: string, ... }) {
  //   axios.post('<api_url>/log/error', JSON.stringify({ error_log: errorInfo })).catch(() => {
  //     // eslint-disable-next-line no-console
  //     console.error('Failed to send error log...');
  //   });
  // }

  handleRestart = async () => {
    await AsyncStorage.clear();
    RNRestart.Restart();
  };

  render(): Node {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.safe}>
          <WhiteBackground />
          <Text style={styles.title}>Oops...</Text>
          <Text style={styles.text}>
            It seems you encountered an error while using the app. Sorry about that.{' '}
            <FontAwesomeIcon
              icon={faGrinBeamSweat}
              color={colors.blue}
            />
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
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={this.handleRestart}
          >
            <Text style={styles.buttonText}>Restart the App</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

export default (ErrorBoundary: ComponentType<Props>);
