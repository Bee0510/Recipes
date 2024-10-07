import React from "react";
import { View, TextInput, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const search = () => {
  return (
    <View className="flex-row items-center bg-gray-200 rounded-full p-2">
      <FontAwesome name="search" size={20} className="text-gray-500 ml-2" />
      <TextInput
        className="flex-1 ml-2 text-gray-900"
        placeholder="Search for your query"
        placeholderTextColor="#6B7280"
      />
      <Pressable className="p-2">
        <FontAwesome name="sliders" size={20} className="text-gray-500" />
      </Pressable>
    </View>
  );
};

export default search;
