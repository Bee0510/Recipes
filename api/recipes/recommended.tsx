import RecommendedModel from "@/models/recommendModel";
import { BASE_URL } from "../constant";

export const recommendedRecipe = async () => {
  try {
    const response = await fetch(`${BASE_URL}/recipe/recommendation`, {
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
