import React from "react";
import { Text, View } from "react-native";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import Hr from "../components/elements/Hr";
import colors from "../styles/colors";
import announcement_style from "../styles/announcement_style";

const contentfulToReactNative = (assets) => ({
  renderMark: {
    [MARKS.UNDERLINE]: (text) => {
      return (
        <Text
          style={[announcement_style.text, { textDecorationLine: "underline" }]}
        >
          {text}
        </Text>
      );
    },
    [MARKS.BOLD]: (text) => {
      return (
        <Text
          style={[
            announcement_style.text,
            { fontFamily: "NegativeHarmonyBold" },
          ]}
        >
          {text}
        </Text>
      );
    },
    [MARKS.ITALIC]: (text) => {
      return <Text style={announcement_style.text}>{text}</Text>;
    },
    [MARKS.CODE]: (text) => {
      return <Text style={announcement_style.text}>{text}</Text>;
    },
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node) => {
      return null;
    },
    [BLOCKS.PARAGRAPH]: (_node, children) => {
      return <Text style={announcement_style.text}>{children}</Text>;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      return null;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return null;
    },
    [BLOCKS.HEADING_1]: (_node, children) => (
      <Text
        style={[
          announcement_style.heading,
          { fontFamily: "NegativeHarmonyBold", fontSize: 26 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <Text
        style={[
          announcement_style.heading,
          { fontFamily: "NegativeHarmonyBold", fontSize: 24 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <Text
        style={[
          announcement_style.heading,
          { fontFamily: "NegativeHarmonyBold", fontSize: 22 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
      <Text
        style={[
          announcement_style.heading,
          { fontFamily: "NegativeHarmonyBold", fontSize: 20 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_5]: (_node, children) => (
      <Text
        style={[
          announcement_style.heading,
          { fontFamily: "NegativeHarmonyBold", fontSize: 18 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_6]: (_node, children) => (
      <Text
        style={[
          announcement_style.heading,
          { fontFamily: "NegativeHarmonyBold", fontSize: 15 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => {
      return (
        <View style={announcement_style.list}>
          {children.map((child, i) => (
            <View key={i} style={announcement_style.listItem}>
              <View style={announcement_style.listBullet} />
              {child}
            </View>
          ))}
        </View>
      );
    },
    [BLOCKS.OL_LIST]: (_node, children) => {
      return (
        <View style={announcement_style.list}>
          {children.map((child, i) => (
            <View key={i} style={announcement_style.listItem}>
              <Text style={announcement_style.listCount}>{Number(i) + 1}</Text>
              {child}
            </View>
          ))}
        </View>
      );
    },
    [BLOCKS.LIST_ITEM]: (_node, child) => {
      return <Text style={announcement_style.text}>{child}</Text>;
    },
    [BLOCKS.QUOTE]: (_node, child) => {
      return (
        <View
          style={{
            borderColor: colors.blue,
            borderLeftWidth: 4,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            paddingLeft: 6,
          }}
        >
          {child}
        </View>
      );
    },
    [BLOCKS.HR]: (_node, child) => {
      return <Hr color={colors.blue} paddingY={10} />;
    },
  },
});

export default contentfulToReactNative;
