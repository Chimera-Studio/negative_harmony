// @flow
import React, { useEffect, useRef } from 'react';
import type { Node } from 'react';
import { Animated, Easing } from 'react-native';
import Icon from '../../../assets/icons/Icon';
import scalesChordsStyles from '../../../styles/scales_chords';

function Logo(): Node {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

    startAnimation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        scalesChordsStyles.icon,
        {
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, 1],
                // $FlowFixMe
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}
    >
      <Icon />
    </Animated.View>
  );
}

export default Logo;
