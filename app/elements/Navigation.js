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
  const [legendStatus, setLegendStatus] = useState(false);
  const path = locationInfo.isScales ? "/chords" : "/";

  const handleAlert = (e) => {
    if (!props.scales) {
      e.preventDefault();
      props.alert();
    }
  };

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
      <TouchableOpacity onPress={() => setLegendStatus(!legendStatus)}>
        <Info style={navigation_style.info} />
      </TouchableOpacity>

      {/*
        <Legend style={styles.legend} />
        <View style={styles.legendContainer}>
          <Legend style={styles.legend} />

          <View style={styles.legend2Wrapper}>
            <Legend2 style={styles.legend2} />
            <TouchableOpacity style={styles.disclamerBtn}>
              <Disclamer style={styles.disclamer} />
            </TouchableOpacity>
          </View>
        </View>
      */}
    </View>
  );
};

export default Navigation;
