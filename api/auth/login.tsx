import loginModel from "../../models/loginModel";
import { BASE_URL } from "../constant";

export const loginUser = async (data) => {
  console.log("Data in loginUser:", data);
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return loginModel.fromJson(jsonResponse);
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};
