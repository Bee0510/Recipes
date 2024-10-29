import React from "react";
import {
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const search = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/(tabs)/search")}>
      <View className="flex-row items-center bg-gray-200 rounded-full p-2">
        <FontAwesome name="search" size={20} className="text-gray-500 ml-2" />
        {/* <TextInput
          className="flex-1 ml-2 text-gray-900"
          placeholder="Search for your query"
          placeholderTextColor="#6B7280"
        /> */}
        <Text className="flex-1 ml-2 text-gray-900">Feeling Hungry</Text>
        <Pressable className="p-2">
          <FontAwesome name="sliders" size={20} className="text-gray-500" />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default search;
