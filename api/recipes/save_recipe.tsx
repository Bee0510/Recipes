import SavedRecipeModel from "@/models/savedrecipeModel";
import { BASE_URL } from "../constant";

export const savedRecipeById = async (userId: any) => {
  try {
    const response = await fetch(`${BASE_URL}/recipe/saved_recipes/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    return SavedRecipeModel.fromJson(jsonResponse);
  } catch (error) {
    console.error("Error in fetching recipes:", error);
    throw error;
  }
};
