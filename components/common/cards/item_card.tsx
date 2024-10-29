import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ItemCard = ({ onpress, item }) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={onpress}>
      <View className="flex-row bg-white p-3 rounded-lg shadow-md w-96 mx-4 my-2">
        {/* Image Section */}
        <View className="relative">
          <Image
            source={{ uri: item.image }}
            className="w-24 h-24 rounded-lg"
            resizeMode="cover"
          />
          {/* Favorite Icon */}
          {/* <TouchableOpacity className="absolute top-1 right-1 bg-white p-1 rounded-full">
            <FontAwesome name="heart-o" size={18} color="gray" />
          </TouchableOpacity> */}
        </View>

        {/* Text Content Section */}
        <View className="flex-1 pl-3">
          <View className="flex-row items-center space-x-1">
            <Text className="font-bold text-lg text-black">{item.name}</Text>
          </View>

          {/* Rating and Time */}
          <View className="flex-row items-center space-x-1 mt-1">
            <FontAwesome name="star" size={14} color="green" />
            <Text className="text-sm text-black">4.2 (14k+)</Text>
            <Text className="text-sm text-gray-500">•</Text>
            <Text className="text-sm text-gray-500">{item.recipe_time}</Text>
          </View>
          {/* Tags and Location */}
          <Text className="text-xs text-gray-500 mt-1">
            {item.serving} • {item.cal} Cal • {item.level}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
