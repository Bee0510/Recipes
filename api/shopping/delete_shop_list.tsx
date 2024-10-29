import messageModel from "@/models/messageModel";
import { BASE_URL } from "../constant";

export const deleteShopByUser = async (userId: any, cartId: any) => {
  try {
    const response = await fetch(
      `${BASE_URL}/shop/shopping-list/${userId}/${cartId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonResponse = await response.json();
    return messageModel.fromJson(jsonResponse);
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};
