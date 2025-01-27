import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import Exit from '@assets/icons/Exit';
import Main from '@components/containers/Main';
import Alert from '@components/elements/misc/Alert';
import useLocale from '@locales';
import { actions } from '@store/globalStore';
import { Font } from '@styles';
import colors from '@styles/colors';
import infoStyle from '@styles/info';
import mainStyle from '@styles/main';
import { useAppDispatch, useTeleport } from '@utils/hooks';
import { secondsToMilliseconds } from 'date-fns';

function Info() {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const { teleport } = useTeleport();
  const [secretDeviceIdTap, setSecretDeviceIdTap] = useState(0);

  const handleDeveloperModeToggle = () => {
    const tapCount = secretDeviceIdTap + 1;
    if (tapCount === 7) {
      dispatch(actions.toggleDeveloperMode(true));
      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(5)}>
          <Text style={mainStyle.alertText}>{t('alert.developer')}</Text>
        </Alert>,
      );

      return;
    }

    setSecretDeviceIdTap(tapCount);
  };

  return (
    <Main style={infoStyle.wrapper}>
      <Link
        to="/chords"
        underlayColor={colors.transparent}
        style={mainStyle.exit}
      >
        <Exit color={colors.blue} />
      </Link>
      <Text style={infoStyle.title}>{t('info.title')}</Text>
      <ScrollView contentContainerStyle={infoStyle.container} showsVerticalScrollIndicator={false}>
        <Text style={infoStyle.text}>
          {t('info.disclaimer_1')}{' '}
          <Text
            style={{
              fontFamily: Font.bold,
              color: colors.red,
            }}
          >
            {t('info.disclaimer_2')}
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
    </Main>
  );
}

export default Info;
