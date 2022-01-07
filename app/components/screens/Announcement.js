import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import WhiteBG from "../elements/WhiteBG";

import useLocale from "../../locales";
import { storeDataToLocal } from "../../utils";
import contentfulToReactNative from "../../utils/cmsArticleBlocks";

import main_style from "../../styles/main_style";
import announcement_style from "../../styles/announcement_style";
import { localStorageKeys } from "../../tokens";

const Announcement = (props) => {
  const t = useLocale;
  const { cms } = props;
  const title = cms ? t("announcement.title") : t("error.title");
  const cta = cms ? t("announcement.cta") : t("error.cta");

  const handleButton = () => {
    if (cms) {
      storeDataToLocal(
        localStorageKeys.announcementTimestamp,
        Date.now().toString()
      );
      props.dismiss();

      return;
    }

    props.reload();
  };

  return (
    <SafeAreaView style={main_style.safe}>
      <WhiteBG />
      <View style={main_style.container}>
        <Text style={announcement_style.title}>{title}</Text>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={main_style.scrollContainer}
          bounces={false}
        >
          {cms ? (
            <>
              {documentToReactComponents(cms.json, contentfulToReactNative())}
            </>
          ) : (
            <Text style={announcement_style.text}>{t("error.text")}</Text>
          )}
        </ScrollView>
        <TouchableOpacity
          style={announcement_style.button}
          activeOpacity={0.6}
          onPress={handleButton}
        >
          <Text style={announcement_style.buttonText}>{cta}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Announcement;
