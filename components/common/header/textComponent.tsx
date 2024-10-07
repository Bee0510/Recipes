import { StyleSheet, Text, View } from "react-native";
import React from "react";

const textComponent = ({
  title,
  fontSize,
  Fontweight,
  color,
  textwidth = "width-2",
}) => {
  return (
    <View>
      <Text className={`${fontSize} ${Fontweight} ${color} ${textwidth}`}>
        {title}
      </Text>
    </View>
  );
};

export default textComponent;

const styles = StyleSheet.create({});
