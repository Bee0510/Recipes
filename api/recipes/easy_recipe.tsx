import { BASE_URL } from "../constant";
import RecommendedModel from "@/models/recommendModel";

export const easyRecipe = async () => {
  try {
    const response = await fetch(`${BASE_URL}/recipe/easyrecipe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    return RecommendedModel.fromJson(jsonResponse);
  } catch (error) {
    console.error("Error in fetching recipes:", error);
    throw error;
  }
};
