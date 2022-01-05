import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Link } from "react-router-native";

import Exit from "../../assets/icons/Exit";
import useLocale from "../../locales";

import colors from "../../styles/colors";
import styles from "../../styles/styles";

const Info = () => {
  const t = useLocale;

  return (
    <View style={styles.disclamerWrapper}>
      <Link to="/chords" underlayColor={colors.transparent} style={styles.exit}>
        <Exit color={colors.blue} />
      </Link>
      <Text style={styles.discTitle}>{t("info.title")}</Text>
      <View style={styles.discTextWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.discText}>
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
          <Text style={styles.discSubTitle}>{t("info.sub_title_1")}</Text>
          <Text style={styles.discText}>{t("info.paragraph_2")}</Text>
          <Text style={styles.discContactTitle}>{t("info.sub_title_2")}</Text>
          <Text style={styles.discText}>
            {t("info.paragraph_3")}
            <Text selectable style={{ color: colors.blue }}>
              {t("info.email")}
            </Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Info;
