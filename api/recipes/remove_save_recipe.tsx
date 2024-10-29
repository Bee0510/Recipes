import messageModel from "@/models/messageModel";
import { BASE_URL } from "../constant";

export const deleteRecipeByUser = async (data: any) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipe/saved_recipes/${data.recipe_id}/${data.userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const jsonResponse = await response.json();
    console.log("Delete request response:", jsonResponse);
    return messageModel.fromJson(jsonResponse);
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};
