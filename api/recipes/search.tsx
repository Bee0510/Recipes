import messageModel from "@/models/messageModel";
import recipeModel from "../../models/recipeModel";
import { BASE_URL } from "../constant";

export const searchRecipe = async (recipeName: any) => {
  try {
    const response = await fetch(`${BASE_URL}/search/${recipeName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    if (
      jsonResponse.message === "The query does not appear to be a food item."
    ) {
      return messageModel.fromJson(jsonResponse);
    } else {
      return recipeModel.fromJson(jsonResponse);
    }
  } catch (error) {
    console.error("Error in fetching recipes:", error);
    throw error;
  }
};
