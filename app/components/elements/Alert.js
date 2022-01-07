import React from "react";
import { Text, View } from "react-native";

import main_style from "../../styles/main_style";

const Alert = (props) => {
  return (
    <View style={main_style.alert}>
      <Text style={main_style.alertText}>{props.text}</Text>
    </View>
  );
};

export default Alert;
