import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wrapper = () => {
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
        } else {
          router.replace("/AuthPage/loginScreen");
        }
      } else {
        router.replace("/AuthPage/loginScreen");
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
  if (loading) {
    return (
      <View className="justify-center items-center flex-1">
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return null;
};
export default wrapper;
