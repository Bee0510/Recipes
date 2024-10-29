import messageModel from "@/models/messageModel";
import { BASE_URL } from "../constant";

export const updateShopItems = async (
  data: any,
  userId: any,
  cartId: any,
  recipeId: any
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/shop//shopping-list/${userId}/${cartId}/${recipeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return messageModel.fromJson(jsonResponse);
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};
