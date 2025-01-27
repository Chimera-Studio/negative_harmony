import React, { useEffect, useRef } from 'react';
import {
  Animated, Easing, Text, View,
} from 'react-native';
import bottomStyle from '@styles/bottom';
import colors from '@styles/colors';
import { deviceHeight } from '@utils';
import map from 'lodash/map';

type Props = {
  data: any,
};

function BottomScales(props: Props) {
  const slideUp = useRef(new Animated.Value(deviceHeight / 2)).current;
  const isFirstLoad = useRef(true);
  const animateBottom = { transform: [{ translateY: slideUp }] };
  const { data } = props;

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;

      if (!data) return;

      slideUp.setValue(0);

      return;
    }

    Animated.timing(slideUp, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <View style={bottomStyle.space}>
      {data && (
        <Animated.View style={[bottomStyle.wrapper, animateBottom]}>
          <View style={[bottomStyle.scale, { alignItems: 'flex-end' }]}>
            {map(data.positive, (note, index) => (
              <Text
                key={index}
                style={[bottomStyle.scaleText, { color: colors.positiveText }]}
              >
                {note}
              </Text>
            ))}
          </View>

          <View style={bottomStyle.axis} />

          <View style={[bottomStyle.scale, { alignItems: 'flex-start' }]}>
            {map(data.negative, (note, index) => (
              <Text
                key={index}
                style={[bottomStyle.scaleText, { color: colors.negativeText }]}
              >
                {note}
              </Text>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

export default BottomScales;
