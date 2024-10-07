import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams, useParams } from "expo-router";
const ingredients = [
  {
    id: "1",
    name: "Granulated sugar",
    amount: "160 g",
    image: "https://example.com/sugar.png",
  },
  {
    id: "2",
    name: "Ground almond",
    amount: "160 g",
    image: "https://example.com/almond.png",
  },
  {
    id: "3",
    name: "Dark chocolate",
    amount: "110 g",
    image: "https://example.com/dark-chocolate.png",
  },
];
const RecipeScreen = () => {
  const router = useRouter();
  const items = useLocalSearchParams();
  const ita = JSON.parse(items.items);
  console.log(ita.image);

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header Section */}
      <View className="relative">
        {/* Image Container */}
        <Image
          source={ita.image} // Replace with your recipe image
          className="w-full h-64"
          resizeMode="cover"
        />
        {/* Back Icon */}
        <TouchableOpacity
          className="absolute top-10 left-4 bg-white p-2 rounded-full shadow-md"
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        {/* Share Icon */}
        <TouchableOpacity className="absolute top-10 right-4 bg-white p-2 rounded-full shadow-md">
          <FontAwesome name="share" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Details Section */}
      <View className="bg-white rounded-t-3xl -mt-6 px-5 pt-6 pb-8">
        {/* Recipe Title */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-bold text-black">{`${ita.title}`}</Text>
          <View className="flex-row items-center space-x-1">
            <FontAwesome name="heart" size={16} color="#fbbf24" />
            <Text className="text-lg text-black font-semibold">4.5</Text>
          </View>
        </View>
        {/* Recipe Meta Info */}
        <Text className="text-gray-500 mb-4">
          By Rachel William | 10 mins | Medium | 512 cal
        </Text>

        {/* Description */}
        <Text className="text-base text-gray-800 mb-4">
          Chocolate is the best kind of dessert! These choco macarons are simply
          heavenly! Delicate little cookies filled with chocolate ganache.
        </Text>

        {/* Ingredients Section */}
        <Text className="text-lg font-semibold mb-3">Ingredients</Text>
        <View className="space-y-2 mb-6">
          <FlatList
            data={ingredients}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center space-x-2">
                  <Image source={{ uri: item.image }} className="w-6 h-6" />
                  <Text className="text-gray-700">{item.name}</Text>
                </View>
                <Text className="text-gray-700">{item.amount}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        {/* Watch Video Button */}
        <TouchableOpacity className="flex-row items-center justify-center bg-green-600 py-3 rounded-full">
          <Text className="text-lg text-white font-bold">Watch Videos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;
