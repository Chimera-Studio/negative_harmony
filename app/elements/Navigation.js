import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "react-router-native";

import Info from "../assets/img/info.svg";

import { eng } from "../locales";
import { useLocationInfo } from "../utils";

import colors from "../styles/colors";
import navigation_style from "../styles/navigation_style";

const Navigation = (props) => {
  const locationInfo = useLocationInfo();
  const path = locationInfo.isScales ? "/chords" : "/";

  const handleAlert = (e) => {
    if (!props.scales) {
      e.preventDefault();
      props.alert();
    }
  };

  if (locationInfo.isInfo || locationInfo.isRewarded) return null;

  return (
    <View style={navigation_style.navigation}>
      <Link
        to={path}
        onPress={(e) => handleAlert(e)}
        underlayColor={colors.lightBlue}
        style={navigation_style.switch}
      >
        <Text style={navigation_style.switchText}>
          {locationInfo.isScales ? eng.links.scales : eng.links.chords}
        </Text>
      </Link>
      <TouchableOpacity onPress={() => props.legendCallback(!props.legend)}>
        <Info style={navigation_style.info} />
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;
