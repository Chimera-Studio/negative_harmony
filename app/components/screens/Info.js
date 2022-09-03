// @flow
import React, { useEffect, useRef } from 'react';
import type { Node } from 'react';
import {
  Text, View, ScrollView, Animated, Easing,
} from 'react-native';
import { Link } from 'react-router-native';
import Exit from '../../assets/icons/Exit';
import useLocale from '../../locales';
import mainStyle from '../../styles/main';
import infoStyle from '../../styles/info';
import colors from '../../styles/colors';

function Info(): Node {
  const { t } = useLocale();
  const screenOpacity = useRef(new Animated.Value(0)).current;

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
      <View style={infoStyle.content}>
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
          <Text style={infoStyle.contactTitle}>{t('info.sub_title_2')}</Text>
          <Text style={infoStyle.text}>{t('info.paragraph_3')}</Text>
          <Text
            selectable
            style={[infoStyle.text, { color: colors.blue, marginTop: -10 }]}
          >
            {t('info.email')}
          </Text>
        </ScrollView>
      </View>
    </Animated.View>
  );
}

export default Info;
