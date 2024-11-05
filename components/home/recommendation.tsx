// Import statements
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import CustomText from "../common/header/textComponent";
import { useRouter } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { recommendedRecipe } from "@/api/recipes/recommended";
import { savedRecipeById } from "@/api/recipes/save_recipe";
import { saveRecipeByUser } from "@/api/recipes/save_recipe_by_user";
import { deleteRecipeByUser } from "@/api/recipes/remove_save_recipe";
import { showToast } from "../common/toast/toast";

const Recommendation = ({
  userDetails,
  selectedCategoryId,
  selectedCategoryname,
}) => {
  const router = useRouter();
  const [savedItems, setSavedItems] = useState(new Set());
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const catDecider = () => {
    if (selectedCategoryId === "veg") {
      return false;
    } else if (selectedCategoryId === "all") {
      return true;
    }
  };
  const mealDecider = (id) => {
    switch (id) {
      case "1":
        return "Lunch";
      case "2":
        return "Dinner";
      case "3":
        return "Breakfast";
      case "4":
        return "Snack";
      case "5":
        return "Main Course";
      case "6":
        return "Appetizer";
      case "7":
        return "Dessert";
      case "8":
        return "None";
      default:
        return "";
    }
  };

  const filterRecipe =
    selectedCategoryId == "all"
      ? recipes.filter(
          (recipe) =>
            recipe.category === mealDecider(selectedCategoryname || "5")
        )
      : recipes.filter(
          (recipe) =>
            recipe.is_nonveg === catDecider() &&
            recipe.category === mealDecider(selectedCategoryname)
        );

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

  const getRecommendation = async () => {
    try {
      const response = await recommendedRecipe();
      if (response && response.recipes) {
        setRecipes(response.recipes);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recommended recipes:", error);
    }
  };

  const saveRecipe = async (recipeId) => {
    try {
      const response = await saveRecipeByUser({
        recipe_id: recipeId,
        savedby_id: userDetails.id.toString(),
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
        userId: userDetails.id.toString(),
      });
      if (response.message === "Recipe removed successfully!") {
        showToast("Recipe removed successfully!");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userDetails && userDetails.id) {
        console.log("Fetching data for user:", userDetails.id);
        await getRecommendation();
        await getSavedRecipeById(userDetails.id);
        setLoading(false);
      } else {
        console.error("userDetails is null or does not have an id property");
        setLoading(false);
      }
    };

    fetchData();
  }, [userDetails, selectedCategoryId, selectedCategoryname]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return filterRecipe.length == 0 ? (
    <></>
  ) : (
    <View className="flex-col mt-[30px]">
      <CustomText
        title={"Recommendation"}
        fontSize={"text-lg"}
        Fontweight={"font-medium"}
        color={"text-black"}
      />
      <View className="h-[10px]"></View>
      <FlatList
        data={filterRecipe}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isSaved = savedItems.has(item.recipe_id);
          return (
            <TouchableOpacity
              className="bg-white p-3 rounded-xl mr-4 shadow-md w-44"
              onPress={() =>
                router.push({
                  pathname: "/recipe/RecipeScreen",
                  params: {
                    items: JSON.stringify(item),
                    userDetails: JSON.stringify(userDetails),
                  },
                })
              }
            >
              <Image
                source={{ uri: item.image }}
                className="w-full h-36 rounded-lg mb-2"
                resizeMode="cover"
              />

              {/* Love Button */}
              <TouchableOpacity
                className="absolute top-3 right-3 bg-transparent p-1 rounded-full"
                onPress={async () => {
                  if (isSaved) {
                    await deleteRecipe(item.recipe_id);
                    setSavedItems((prevSavedItems) => {
                      const updatedSet = new Set(prevSavedItems);
                      updatedSet.delete(item.recipe_id);
                      return updatedSet;
                    });
                  } else {
                    await saveRecipe(item.recipe_id);
                    setSavedItems((prevSavedItems) => {
                      const updatedSet = new Set(prevSavedItems);
                      updatedSet.add(item.recipe_id);
                      return updatedSet;
                    });
                  }
                }}
              >
                <AntDesign
                  name={isSaved ? "heart" : "hearto"}
                  size={20}
                  color={isSaved ? "red" : "white"}
                />
              </TouchableOpacity>

              <Text
                className="text-sm font-semibold text-black"
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <View className="flex-row items-center space-x-2">
                <FontAwesome name="clock-o" size={16} color="black" />
                <Text className="text-gray-500">
                  {item.recipe_time || "N/A"}
                </Text>
              </View>
              <View className="flex-row items-center space-x-2">
                <FontAwesome name="cutlery" size={16} color="black" />
                <Text className="text-gray-500">{item.cal || "N/A"} cal</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Recommendation;
