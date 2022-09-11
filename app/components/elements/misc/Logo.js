// @flow
import React, { useEffect, useRef } from 'react';
import type { Node } from 'react';
import { Animated, Easing } from 'react-native';
import { secondsToMilliseconds } from 'date-fns';
import Icon from '../../../assets/icons/Icon';
import scalesChordsStyles from '../../../styles/scales_chords';

type Props = {
  animationSpeed?: number,
  style?: Object,
};

function Logo(props: Props): Node {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(rotate, {
        toValue: 1,
        duration: props.animationSpeed || secondsToMilliseconds(24),
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
        { ...props.style },
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
