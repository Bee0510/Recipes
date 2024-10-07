import React from "react";
import { View, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const InputBox = ({ value, placeholder, onChangeText, keyboardType, icon }) => {
  return (
    <View className="flex-row items-center bg-gray-200 rounded-full p-3 mt-2">
      <FontAwesome name={icon} size={20} className="text-gray-500 ml-2" />
      <TextInput
        className="flex-1 ml-2 text-gray-900"
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputBox;
