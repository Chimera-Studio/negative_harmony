import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Animated } from 'react-native';
import mainStyle from '../../../styles/main';
import { useTeleport } from '../../../utils/hooks';

type Props = {
  children: ReactNode,
  clearDelayMS?: number,
};

function Alert(props: Props) {
  const { close } = useTeleport();
  const fadeAlert = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (!props.clearDelayMS) {
      Animated.timing(fadeAlert, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      return;
    }

    const timeoutID = setTimeout(() => close(), props.clearDelayMS);

    Animated.sequence([
      Animated.timing(fadeAlert, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAlert, {
        toValue: 0,
        delay: (props.clearDelayMS || 3000) - 600,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    return () => clearTimeout(timeoutID);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  return (
    <Animated.View style={[mainStyle.alert, { opacity: fadeAlert }]}>
      {props.children}
    </Animated.View>
  );
}

export default Alert;
