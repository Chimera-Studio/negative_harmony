// @flow
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Text, View } from 'react-native';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Hr from '../components/elements/misc/Hr';
import announcementStyle from '../styles/announcement';
import colors from '../styles/colors';

const contentfulToReactNative = (): any => ({
  renderMark: {
    [MARKS.UNDERLINE]: (text) => (
      <Text
        style={[announcementStyle.text, { textDecorationLine: 'underline' }]}
      >
        {text}
      </Text>
    ),
    [MARKS.BOLD]: (text) => (
      <Text
        style={[
          announcementStyle.text,
          { fontFamily: 'NegativeHarmonyBold' },
        ]}
      >
        {text}
      </Text>
    ),
    [MARKS.ITALIC]: (text) => <Text style={announcementStyle.text}>{text}</Text>,
    [MARKS.CODE]: (text) => <Text style={announcementStyle.text}>{text}</Text>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: () => null,
    [BLOCKS.PARAGRAPH]: (_node, children) => <Text style={announcementStyle.text}>{children}</Text>,
    [BLOCKS.EMBEDDED_ENTRY]: () => null,
    [BLOCKS.EMBEDDED_ASSET]: () => null,
    [BLOCKS.HEADING_1]: (_node, children) => (
      <Text
        style={[
          announcementStyle.heading,
          { fontFamily: 'NegativeHarmonyBold', fontSize: 26 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <Text
        style={[
          announcementStyle.heading,
          { fontFamily: 'NegativeHarmonyBold', fontSize: 24 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <Text
        style={[
          announcementStyle.heading,
          { fontFamily: 'NegativeHarmonyBold', fontSize: 22 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
      <Text
        style={[
          announcementStyle.heading,
          { fontFamily: 'NegativeHarmonyBold', fontSize: 20 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_5]: (_node, children) => (
      <Text
        style={[
          announcementStyle.heading,
          { fontFamily: 'NegativeHarmonyBold', fontSize: 18 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_6]: (_node, children) => (
      <Text
        style={[
          announcementStyle.heading,
          { fontFamily: 'NegativeHarmonyBold', fontSize: 15 },
        ]}
      >
        {children}
      </Text>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <View style={announcementStyle.list}>
        {children.map((child, i) => (
          <View key={i} style={announcementStyle.listItem}>
            <View style={announcementStyle.listBullet} />
            {child}
          </View>
        ))}
      </View>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <View style={announcementStyle.list}>
        {children.map((child, i) => (
          <View key={i} style={announcementStyle.listItem}>
            <Text style={announcementStyle.listCount}>{Number(i) + 1}</Text>
            {child}
          </View>
        ))}
      </View>
    ),
    [BLOCKS.LIST_ITEM]: (_node, child) => <Text style={announcementStyle.text}>{child}</Text>,
    [BLOCKS.QUOTE]: (_node, child) => (
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
    ),
    [BLOCKS.HR]: () => <Hr color={colors.blue} paddingY={10} />,
  },
});

export default contentfulToReactNative;
