import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Icon from '@assets/icons/Icon';
import scalesStyle from '@styles/scales';
import { secondsToMilliseconds } from 'date-fns';

type Props = {
  animationSpeed?: number,
  style?: Object,
};

function Logo(props: Props) {
  const rotate = useRef(new Animated.Value(0)).current;
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (!isFirstLoad.current) return;
    isFirstLoad.current = false;

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
        scalesStyle.icon,
        {
          ...props.style,
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, 1],
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
