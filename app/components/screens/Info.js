// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import {
  Text, View, ScrollView, Animated, Easing, TouchableOpacity,
} from 'react-native';
import { Link } from 'react-router-native';
import { useDispatch } from 'react-redux';
import { secondsToMilliseconds } from 'date-fns';
import Alert from '../elements/misc/Alert';
import Exit from '../../assets/icons/Exit';
import useLocale from '../../locales';
import { useTeleport } from '../../utils/hooks';
import { actions } from '../../store/globalStore';
import mainStyle from '../../styles/main';
import infoStyle from '../../styles/info';
import colors from '../../styles/colors';

function Info(): Node {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const { teleport } = useTeleport();
  const [secretDeviceIdTap, setSecretDeviceIdTap] = useState(0);
  const screenOpacity = useRef(new Animated.Value(0)).current;

  const handleDeveloperModeToggle = () => {
    if (secretDeviceIdTap === 7) {
      dispatch(actions.toggleDeveloperMode(true));
      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(5)}>
          <Text style={mainStyle.alertText}>{t('alert.developer')}</Text>
        </Alert>,
      );

      return;
    }

    setSecretDeviceIdTap(secretDeviceIdTap + 1);
  };

  useEffect(() => {
    const handleScreenAnimation = (to) => {
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
    <Animated.View style={[infoStyle.wrapper, { opacity: screenOpacity }]}>
      <Link
        to="/chords"
        underlayColor={colors.transparent}
        style={mainStyle.exit}
      >
        <Exit color={colors.blue} />
      </Link>
      <Text style={infoStyle.title}>{t('info.title')}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={infoStyle.text}>
          {t('info.disclamer_1')}{' '}
          <Text
            style={{
              fontFamily: 'NegativeHarmony-Bold',
              color: colors.red,
            }}
          >
            {t('info.disclamer_2')}
          </Text>{' '}
          {t('info.paragraph_1')}
        </Text>
        <Text style={infoStyle.subTitle}>{t('info.sub_title_1')}</Text>
        <Text style={infoStyle.text}>{t('info.paragraph_2')}</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleDeveloperModeToggle}
        >
          <Text style={infoStyle.contactTitle}>{t('info.sub_title_2')}</Text>
        </TouchableOpacity>
        <Text style={infoStyle.text}>{t('info.paragraph_3')}</Text>
        <Text
          selectable
          style={[infoStyle.text, { color: colors.blue, marginTop: -10 }]}
        >
          {t('info.email')}
        </Text>
      </ScrollView>
      <View style={mainStyle.adSpace} />
    </Animated.View>
  );
}

export default Info;
