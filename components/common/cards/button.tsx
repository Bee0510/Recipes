import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const button = ({ buttonText, textStyle, buttonStyle, onPress }) => {
  return (
    <TouchableOpacity className={`${buttonStyle}`} onPress={onPress}>
      <Text className={`${textStyle}`}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default button;
