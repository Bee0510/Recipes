import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../../components/common/header/textComponent";
import { useRouter } from "expo-router";
import { topRecipe } from "@/api/recipes/top_recipe";
import Loader from "../common/activity/loader";
const toprecipes = ({ userDetails }) => {
  const router = useRouter();
  const [topItems, settopItems] = useState({});
  const getTopRecipe = async () => {
    try {
      const response = await topRecipe();
      if (response) {
        settopItems(response.recipes);
      } else {
        settopItems([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
    }
  };

  useEffect(() => {
    getTopRecipe();
  }, []);
  return topItems.length == 0 ? (
    <ActivityIndicator />
  ) : (
    <View className="flex-col mt-[10px]">
      <View className="mb-4">
        <CustomText
          title={"Top Recipes"}
          fontSize={"text-lg"}
          Fontweight={"font-medium"}
          color={"text-black"}
        />
      </View>

      <FlatList
        data={topItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="bg-white p-2 rounded-xl mr-4 shadow-md w-60 items-center justify-center"
            onPress={() => {
              router.push({
                pathname: "/recipe/RecipeScreen",
                params: {
                  items: JSON.stringify(item),
                  userDetails: JSON.stringify(userDetails),
                },
              });
            }}
          >
            <Image
              source={{ uri: item.image }}
              className="w-full h-32 rounded-lg mb-2"
              resizeMode="cover"
            />
            <View>
              <Text
                className="text-sm font-semibold text-black overflow-hidden"
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default toprecipes;
