import React, { useEffect } from "react";
import { Animated, Easing } from "react-native";
import Icon from "../../assets/img/icon.svg";
import scales_chords_styles from "../../styles/scales_chords_styles";

const Logo = () => {
  const rotate = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(rotate, {
      toValue: 1,
      duration: 24000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      rotate.setValue(0);
      startAnimation();
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Animated.View
      style={[
        scales_chords_styles.icon,
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

export default React.memo(Logo);
