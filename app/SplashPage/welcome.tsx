import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link, router, useNavigation } from "expo-router";
import { useRouter } from "expo-router";
import Lottie from "lottie-react-native";
import Button from "../../components/common/cards/button";

export default function welcome() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-[#E3F4F4] justify-start items-center p-6">
      {/* Lottie Animation View */}
      <View className="w-full h-1/2 mb-4">
        <Lottie
          source={require("../../assets/images/start cooking.json")}
          autoPlay
          loop
          className="w-full h-full"
        />
      </View>

      {/* Text Content */}
      <Text className="text-orange-600 font-semibold text-sm mb-2">
        UNLIMITED PREMIUM RECIPES
      </Text>
      <Text className="text-black text-4xl font-extrabold text-center mb-6">
        Start{"\n"}Cooking
      </Text>

      {/* Button View */}
      <View className="flex-row w-full px-11 justify-between mt-4 space-x-4 ">
        {/* Login Button */}
        <Button
          buttonText={"Log In"}
          onPress={() => router.push("/(tabs)")}
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
