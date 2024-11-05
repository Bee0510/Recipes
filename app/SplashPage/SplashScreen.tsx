import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 3000 }),
  }));

  useEffect(() => {
    opacity.value = 0.5;
    setTimeout(() => {
      router.replace("/SplashPage/welcome");
    }, 3000);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className=" bg-[#0C9A61] rounded-full w-[250px] h-[250px] items-center justify-center">
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-2/3 h-2/3"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
