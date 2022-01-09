import React, { useEffect, useRef } from "react";
import { Text, View, ScrollView, Animated, Easing } from "react-native";
import { Link } from "react-router-native";

import Exit from "../../assets/icons/Exit";
import useLocale from "../../locales";

import colors from "../../styles/colors";
import main_style from "../../styles/main_style";
import info_style from "../../styles/info_style";

const Info = () => {
  const t = useLocale;
  const screenOpacity = useRef(new Animated.Value(0)).current;

  const handleScreenAnimation = (to) => {
    Animated.timing(screenOpacity, {
      toValue: to,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  useEffect(() => {
    handleScreenAnimation(1);

    return () => handleScreenAnimation(0);
  }, []);

  return (
    <Animated.View style={[info_style.wrapper, { opacity: screenOpacity }]}>
      <Link
        to="/chords"
        underlayColor={colors.transparent}
        style={main_style.exit}
      >
        <Exit color={colors.blue} />
      </Link>
      <Text style={info_style.title}>{t("info.title")}</Text>
      <View style={info_style.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={info_style.text}>
            {t("info.disclamer_1")}{" "}
            <Text
              style={{
                fontFamily: "NegativeHarmonyBold",
                color: colors.red,
              }}
            >
              {t("info.disclamer_2")}
            </Text>{" "}
            {t("info.paragraph_1")}
          </Text>
          <Text style={info_style.subTitle}>{t("info.sub_title_1")}</Text>
          <Text style={info_style.text}>{t("info.paragraph_2")}</Text>
          <Text style={info_style.contactTitle}>{t("info.sub_title_2")}</Text>
          <Text style={info_style.text}>{t("info.paragraph_3")}</Text>
          <Text
            selectable
            style={[info_style.text, { color: colors.blue, marginTop: -10 }]}
          >
            {t("info.email")}
          </Text>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Info;
