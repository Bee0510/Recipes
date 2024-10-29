import messageModel from "@/models/messageModel";
import { BASE_URL } from "../constant";

export const saveRecipeByUser = async (data: any) => {
  try {
    const response = await fetch(`${BASE_URL}/recipe/save_recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();
    console.log("POST request response:", jsonResponse);
    return messageModel.fromJson(jsonResponse);
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};
