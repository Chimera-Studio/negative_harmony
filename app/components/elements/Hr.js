import React from "react";
import { View } from "react-native";
import colors from "../../styles/colors";

const Hr = (props) => {
  const height = props.height ? props.height : 2;
  const color = props.color ? props.color : colors.white;

  return (
    <View
      style={{
        width: "100%",
        paddingVertical: props.paddingY !== undefined ? props.paddingY : null,
        paddingHorizontal: props.paddingX !== undefined ? props.paddingX : null,
      }}
    >
      <View
        style={{
          backgroundColor: color,
          borderRadius: height / 2,
          height: height,
          width: "100%",
        }}
      />
    </View>
  );
};

export default Hr;
