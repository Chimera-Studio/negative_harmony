import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';
import { secondsToMilliseconds } from 'date-fns';
import { floor } from 'lodash';

type Props = {
  style?: Object,
  countdownFrom: number | null,
  onChange?: Function,
  isHidden?: boolean,
};

function CountdownTimer(props: Props) {
  const [time, setTime] = useState(props.countdownFrom ? props.countdownFrom - Date.now() : 0);
  const timerRef = useRef(time);

  const handleLeadingZero = (val: number | string): string => String(val).padStart(2, '0');

  const handleTime = (): string => {
    const hours = floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = floor((time % (1000 * 60)) / 1000);

    return handleLeadingZero(hours) + ':' + handleLeadingZero(minutes) + ':' + handleLeadingZero(seconds);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= secondsToMilliseconds(1);
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
        if (props.onChange) props.onChange(timerRef.current);
      }
    }, secondsToMilliseconds(1));

    return () => {
      clearInterval(timerId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.isHidden) return null;

  return (
    <Text style={props.style}>{handleTime()}</Text>
  );
}

export default CountdownTimer;
