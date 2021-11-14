import React, { useState } from "react";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

import Info from "../assets/img/info.svg";

import colors from "../styles/colors";
import navigation_style from "../styles/navigation_style";

const Navigation = () => {
  const [switchText, setSwitchText] = useState("Scales");
  const [legendStatus, setLegendStatus] = useState(false);

  return (
    <View style={navigation_style.navigation}>
      <TouchableHighlight
        style={navigation_style.switch}
        underlayColor={colors.lightBlue}
        onPress={() => setSwitchText("Chords")}
      >
        <Text style={navigation_style.switchText}>{switchText}</Text>
      </TouchableHighlight>
      <TouchableOpacity onPress={() => setLegendStatus(!legendStatus)}>
        <Info style={navigation_style.info} />
      </TouchableOpacity>

      {/* <Legend style={styles.legend} /> */}
    </View>
  );
};

export default Navigation;
