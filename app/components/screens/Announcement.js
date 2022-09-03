// @flow
import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View,
} from 'react-native';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import useLocale from '../../locales';
import { useLocalStorage } from '../../utils/hooks';
import contentfulToReactNative from '../../utils/cmsArticleBlocks';
import { localStorageKeys } from '../../tokens';
import mainStyle from '../../styles/main';
import announcementStyle from '../../styles/announcement';

type Props = {
  cms: Object,
  dismiss: Function,
  reload: Function,
};

function Announcement(props: Props): Node {
  const { t } = useLocale();
  const localStorage = useLocalStorage();
  const { cms } = props;
  const title = cms ? t('announcement.title') : t('error.title');
  const cta = cms ? t('announcement.cta') : t('error.cta');

  const handleButton = () => {
    if (cms) {
      localStorage.setItem(localStorageKeys.announcementTimestamp, String(Date.now()));
      props.dismiss();

      return;
    }

    props.reload();
  };

  return (
    <View style={mainStyle.container}>
      <StatusBar hidden />
      <SafeAreaView style={mainStyle.safe}>
        <View style={mainStyle.container}>
          <Text style={announcementStyle.title}>{title}</Text>
          <ScrollView
            style={[{ flex: 1 }]}
            contentContainerStyle={mainStyle.scrollContainer}
            bounces={false}
          >
            {cms ? (
              documentToReactComponents(cms.json, contentfulToReactNative())
            ) : (
              <Text style={announcementStyle.text}>{t('error.text')}</Text>
            )}
          </ScrollView>
          <TouchableOpacity
            style={announcementStyle.button}
            activeOpacity={0.6}
            onPress={handleButton}
          >
            <Text style={announcementStyle.buttonText}>{cta}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Announcement;
