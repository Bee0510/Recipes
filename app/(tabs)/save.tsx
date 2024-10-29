import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import ItemCard from "../../components/common/cards/item_card";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { savedRecipeById } from "@/api/recipes/save_recipe";
import Loader from "@/components/common/activity/loader";
import { useFocusEffect } from "@react-navigation/native";
import { deleteRecipeByUser } from "@/api/recipes/remove_save_recipe";

export default function save() {
  const [savedItems, setSavedItems] = useState(new Set());
  const router = useRouter();
  const { userDetails } = useLocalSearchParams();
  const [parsedUser, setParsedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      if (userDetails) {
        try {
          const user = JSON.parse(userDetails);
          setParsedUser(user);
          getSavedRecipeById(user.id);
        } catch (error) {
          console.error("Failed to parse userDetails:", error);
        }
      } else {
        console.log("No userDetails received.");
      }
    }, [userDetails])
  );

  const getSavedRecipeById = async (userId) => {
    try {
      const response = await savedRecipeById(userId);
      if (response) {
        setLoading(false);
        setSavedItems(response.savedRecipes);
      } else {
        setSavedItems([]);
      }
    } catch (e) {
      console.error("Error in fetching recipes:", e);
    } finally {
      setLoading(false);
    }
  };
  const deleteRecipe = async (recipeId) => {
    try {
      const response = await deleteRecipeByUser({
        recipe_id: recipeId,
        userId: parsedUser.id.toString(),
      });
      if (response) {
        console.log(`Recipe unsaved: ${response.message}`);
        setSavedItems((prevSavedItems) =>
          prevSavedItems.filter((recipe) => recipe.recipe_id !== recipeId)
        );
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <View className="flex-1 bg-gray-100">
      {/* Header Section */}
      <View className="flex-row justify-center items-center py-2 bg-white shadow-md">
        <Text className="text-xl font-bold text-black">Saved Recipes</Text>
      </View>

      <FlatList
        className="flex-1 px-2 bg-gray-200 pt-2"
        data={savedItems}
        numColumns={2}
        keyExtractor={(item) => item.recipe_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white p-3 rounded-xl mr-4 shadow-md w-44 mb-3"
            onPress={() =>
              router.push({
                pathname: "/recipe/RecipeScreen",
                params: {
                  items: JSON.stringify(item),
                  userDetails: JSON.stringify(parsedUser),
                },
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              className="w-full h-28 rounded-lg mb-2"
              resizeMode="cover"
            />

            {/* Love Button */}
            <TouchableOpacity
              className="absolute top-3 right-3 bg-transparent p-1 rounded-full"
              onPress={async () => {
                await deleteRecipe(item.recipe_id);
              }}
            >
              <AntDesign name="heart" size={20} color="red" />
            </TouchableOpacity>

            <Text className="text-base font-semibold text-black">
              {item.name}
            </Text>
            <Text className="text-gray-500">
              {item.recipe_time || "N/A"}| {item.level || "Easy"} |{" "}
              {item.cal || "N/A"} cal
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className="mt-10 items-center">
            <Text className="text-gray-500 text-base">No results found</Text>
          </View>
        )}
      />
    </View>
  );
}
