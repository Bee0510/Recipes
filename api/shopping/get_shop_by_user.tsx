import { BASE_URL } from "../constant";
import ShoppingListResponse from "@/models/shoppingModel";

export const getShopItemById = async (userId: any) => {
  try {
    const response = await fetch(`${BASE_URL}/shop/shopping-list/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    return ShoppingListResponse.fromJson(jsonResponse);
  } catch (error) {
    console.error("Error in fetching recipes:", error);
    throw error;
  }
};
