import React, { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Animated, Easing } from 'react-native';
import type { ViewStyle } from 'react-native';

type Props = {
  style: ViewStyle
  children: ReactNode
};

function Main(props: Props) {
  const screenOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const handleScreenAnimation = (to: any) => {
      Animated.timing(screenOpacity, {
        toValue: to,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    };

    handleScreenAnimation(1);

    return () => handleScreenAnimation(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[props.style, { opacity: screenOpacity }]}>
      {props.children}
    </Animated.View>
  );
}

export default Main;
