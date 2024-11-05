import { BASE_URL } from "../constant";
import messageModel from "@/models/messageModel";
export const resetPassword = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
      console.log("Error:", jsonResponse);
      throw new Error(jsonResponse.message || "Failed to reset password");
    }

    console.log("Password reset successfully:", jsonResponse);
    return messageModel.fromJson(jsonResponse);
  } catch (error) {
    console.log("Error in reset password request:", error);
    throw error;
  }
};
