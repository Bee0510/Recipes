import UserModel from "../../models/userModel";
import { BASE_URL } from "../constant";

export const registerUser = async (data) => {
  console.log("Data in registerUser:", data);
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    // if (!response.ok) {
    //   console.error("Server Error:", jsonResponse);
    //   throw new Error(
    //     `HTTP error! status: ${response.status} - ${
    //       jsonResponse.message || "Unknown error"
    //     }`
    //   );
    // }

    console.log(jsonResponse);
    return UserModel.fromJson(jsonResponse);
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};
