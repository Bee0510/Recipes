import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Link, router, useNavigation } from "expo-router";
import { useRouter } from "expo-router";
import Lottie from "lottie-react-native";
import Button from "../../components/common/cards/button";
import { registerUser } from "../../api/auth/register";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function welcome() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData != null) {
        const parsedUser = JSON.parse(userData);
        console.log("User data retrieved from AsyncStorage:", parsedUser);
        setUser(parsedUser);
        if (parsedUser != null) {
          router.replace({
            pathname: "/(tabs)",
            params: { userDetails: JSON.stringify(parsedUser) },
          });
        }
      }
    } catch (error) {
      console.error("Failed to retrieve user data:", error);
      router.replace("/AuthPage/loginScreen");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <View className="flex-1 bg-[#E3F4F4] justify-start items-center p-6">
      <View className="w-full h-1/2 mb-4">
        <Lottie
          source={require("../../assets/images/start cooking.json")}
          autoPlay
          loop
          className="w-full h-full"
        />
      </View>
      <Text className="text-orange-600 font-semibold text-sm mb-2">
        UNLIMITED PREMIUM RECIPES
      </Text>
      <Text className="text-black text-4xl font-extrabold text-center mb-6">
        Start{"\n"}Cooking
      </Text>
      <View className="flex-row w-full px-11 justify-between mt-4 space-x-4 ">
        <Button
          buttonText={"Log In"}
          onPress={() => {
            router.push("/AuthPage/loginScreen");
          }}
          buttonStyle={"bg-yellow-400 py-3 px-6 rounded-full shadow-lg"}
          textStyle={"text-lg text-black font-semibold"}
        />

        {/* Sign Up Button */}
        <Button
          buttonText={"Sign Up"}
          buttonStyle={"bg-green-600 py-3 px-6 rounded-full shadow-lg"}
          textStyle={"text-lg text-black font-semibold"}
          onPress={() => router.push("/AuthPage/SignupScreen")}
        />
      </View>
    </View>
  );
}
