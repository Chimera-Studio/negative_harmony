// @flow
import React, { useEffect, useRef } from 'react';
import type { Node } from 'react';
import {
  Animated,
  Easing,
  Text,
  View,
} from 'react-native';
import { map } from 'lodash';
import { deviceHeight } from '../../../utils';
import bottomStyle from '../../../styles/bottom';
import mainStyle from '../../../styles/main';
import colors from '../../../styles/colors';

type Props = {
  data: any,
};

function BottomScales(props: Props): Node {
  const slideUp = useRef(new Animated.Value(deviceHeight / 2)).current;
  const { data } = props;
  const animateBottom = {
    transform: [{ translateY: slideUp }],
  };

  useEffect(() => {
    if (data) {
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data) slideUp.setValue(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <View style={mainStyle.adSpace} />
        </Animated.View>
      )}
    </View>
  );
}

export default BottomScales;
