import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";

import WhiteBG from "../elements/WhiteBG";
import main_style from "../../styles/main_style";
import announcement_style from "../../styles/announcement_style";

const Announcement = (props) => {
  return (
    <SafeAreaView style={main_style.safe}>
      <WhiteBG />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={main_style.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text style={announcement_style.title}>{props.title}</Text>
        <Text style={announcement_style.text}>{props.text}</Text>

        <TouchableOpacity
          style={announcement_style.button}
          activeOpacity={0.6}
          onPress={() => props.onPress()}
        >
          <Text style={announcement_style.buttonText}>{props.cta}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Announcement;
