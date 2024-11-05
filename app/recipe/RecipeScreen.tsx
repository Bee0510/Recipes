import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import CheckBox from "../../components/common/chechbox/checkbox";
import { saveRecipeByUser } from "@/api/recipes/save_recipe_by_user";
import { deleteRecipeByUser } from "@/api/recipes/remove_save_recipe";
import { savedRecipeById } from "@/api/recipes/save_recipe";
import { saveShopListByUser } from "@/api/shopping/save_shop_list";
import { getShopItemByRecipeId } from "@/api/shopping/get_shop_list_by_recipe";
import { updateShopItems } from "@/api/shopping/update_shop_list";
import { deleteShopByUser } from "@/api/shopping/delete_shop_list";
import { showToast } from "@/components/common/toast/toast";

const RecipeScreen = () => {
  const router = useRouter();
  const { items, userDetails } = useLocalSearchParams();
  const ita = JSON.parse(items);
  const parsedUser = JSON.parse(userDetails);
  const [savedItems, setSavedItems] = useState(new Set());
  const [savedIngrediants, setSavedIngrediants] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cartId, setCartId] = useState(null);
  const getSavedRecipeById = async (userId) => {
    try {
      const response = await savedRecipeById(userId);
      if (response && response.savedRecipes) {
        const savedRecipeIds = new Set(
          response.savedRecipes.map((recipe) => recipe.recipe_id)
        );
        setSavedItems(savedRecipeIds);
      } else {
        setSavedItems(new Set());
      }
    } catch (e) {
      console.error("Error in fetching saved recipes:", e);
    }
  };

  const saveRecipe = async (recipeId) => {
    try {
      const response = await saveRecipeByUser({
        recipe_id: recipeId,
        savedby_id: parsedUser.id.toString(),
      });
      if (response.message === "Recipe saved successfully!") {
        showToast("Recipe saved successfully!");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await deleteRecipeByUser({
        recipe_id: recipeId,
        userId: parsedUser.id.toString(),
      });
      if (response.message === "Recipe removed successfully!") {
        showToast("Recipe removed successfully!");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const getShopListByRecipe = async (user_id, recipe_id) => {
    try {
      const response = await getShopItemByRecipeId(user_id, recipe_id);
      if (response.data.length > 0) {
        setSavedIngrediants(response.data[0].ingredients);
        setCartId(response.data[0].cartId);
        console.log(
          "Shop list found for this recipe.",
          response.data[0].cartId
        );
      } else {
        setSavedIngrediants([]);
        setCartId(null);
      }
    } catch (error) {
      console.error("Error fetching shop list:", error);
    }
  };

  const saveShopList = async () => {
    try {
      const response = await saveShopListByUser({
        userId: parsedUser.id,
        recipeId: ita.recipe_id,
        recipeName: ita.name,
        ingredients: selectedIngredients,
      });
      if (response.message === "List created successfully") {
        showToast(
          "List created successfully",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      }
    } catch (error) {
      console.error("Error saving shop list:", error);
    }
  };

  const deleteShopList = async (cartId: any) => {
    console.log(cartId);
    console.log(parsedUser.id);
    try {
      const response = await deleteShopByUser(parsedUser.id, cartId);
      if (response.message === "List deleted successfully") {
        saveShopList();
      }
    } catch (error) {
      console.error("Failed to delete shopping list:", error);
    }
  };
  const updateShopList = async (cartId) => {
    console.log("Updating shop list...", cartId);
    try {
      const response = await updateShopItems(
        { ingredients: selectedIngredients },
        cartId,
        parsedUser.id,
        ita.recipe_id
      );
      if (response) console.log(`Shop List updated: ${response.message}`);
    } catch (error) {
      console.error("Error updating shop list:", error);
    }
  };

  useEffect(() => {
    if (parsedUser?.id) {
      const fetchData = async () => {
        await getSavedRecipeById(parsedUser.id);
        await getShopListByRecipe(parsedUser.id, ita.recipe_id);
      };
      fetchData();
    }
  }, [parsedUser.id, ita.recipe_id]);

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const isSaved = savedItems.has(ita.recipe_id);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="relative">
        <Image
          source={{ uri: ita.image }}
          className="w-full h-64"
          resizeMode="cover"
        />
        <TouchableOpacity
          className="absolute top-2 left-1 bg-transparent p-2 rounded-full shadow-md"
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute top-2 right-1 bg-transparent p-2 rounded-full shadow-md"
          onPress={() => {
            if (isSaved) {
              deleteRecipe(ita.recipe_id);
              setSavedItems((prev) => {
                const updatedSet = new Set(prev);
                updatedSet.delete(ita.recipe_id);
                return updatedSet;
              });
            } else {
              saveRecipe(ita.recipe_id);
              setSavedItems((prev) => {
                const updatedSet = new Set(prev);
                updatedSet.add(ita.recipe_id);
                return updatedSet;
              });
            }
          }}
        >
          <FontAwesome
            name="heart"
            size={24}
            color={isSaved ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-t-3xl -mt-6 px-5 pt-6 pb-8">
        <View className="flex-row justify-center items-center mb-2 -mt-2">
          <Text className="text-xl font-bold text-black">{ita.name}</Text>
        </View>

        <Text className="text-gray-500 mb-4">
          {ita.recipe_time || "N/A"} | {ita.level || "Easy"} |{" "}
          {ita.cal || "N/A"} Cal
        </Text>
        <Text className="text-gray-500 mb-4">
          Servings: {ita.serving || "N/A"}
        </Text>

        <Text className="text-base text-gray-800 mb-4">
          {ita.description || "No description available for this recipe."}
        </Text>

        <Text className="text-lg font-semibold mb-3">Ingredients</Text>
        <View className="space-y-2 mb-6">
          {Array.isArray(ita.ingredients) && ita.ingredients.length > 0 ? (
            ita.ingredients.map((ingredient, index) => (
              <CheckBox
                key={index}
                title={ingredient}
                isChecked={selectedIngredients.includes(ingredient)}
                onPress={() => handleCheckboxChange(ingredient)}
              />
            ))
          ) : (
            <Text className="text-gray-500">No ingredients available.</Text>
          )}
        </View>

        {selectedIngredients.length > 0 && (
          <TouchableOpacity
            className="bg-green-500 rounded-lg px-4 py-2 mb-6"
            onPress={() => {
              if (cartId != undefined) {
                deleteShopList(cartId);
              } else {
                saveShopList();
              }
            }}
          >
            <Text className="text-white text-center font-semibold">
              Add to List
            </Text>
          </TouchableOpacity>
        )}

        <Text className="text-lg font-semibold mb-3">Steps</Text>
        <View className="space-y-2 mb-6">
          {Array.isArray(ita.steps) && ita.steps.length > 0 ? (
            ita.steps.map((step, index) => (
              <Text key={index} className="text-gray-700">
                {step}
              </Text>
            ))
          ) : (
            <Text className="text-gray-500">No steps available.</Text>
          )}
        </View>
        {/* Tips Section */}
        <Text className="text-lg font-semibold mb-3">Tips</Text>
        <View className="space-y-2 mb-2">
          {Array.isArray(ita.tips) && ita.tips.length > 0 ? (
            ita.tips.map((tip, index) => (
              <View key={index} className="flex-row space-x-2 items-start mb-3">
                {/* <Text className="text-lg text-gray-800 font-bold">
                  {index + 1}.
                </Text> */}
                <Text className="text-gray-700">{tip}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">No tips available.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;
