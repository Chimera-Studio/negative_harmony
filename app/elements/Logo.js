import React, { useEffect } from "react";
import { Animated, Easing } from "react-native";

import styles from "../styles/styles";

import Icon from "../assets/img/icon.svg";

const Logo = () => {
  const rotate = new Animated.Value(0);

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    rotate.setValue(0);
    Animated.timing(rotate, {
      toValue: 1,
      duration: 24000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      startAnimation();
    });
  };

  return (
    <Animated.View
      style={[
        styles.icon,
        {
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        },
      ]}
    >
      <Icon />
    </Animated.View>
  );
};

export default Logo;
