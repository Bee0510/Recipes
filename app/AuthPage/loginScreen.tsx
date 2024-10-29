import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Lottie from "lottie-react-native";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/common/cards/button";
import InputBox from "../../components/auth/textinput";
import { FontAwesome } from "@expo/vector-icons";
import { loginUser } from "../../api/auth/login";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/components/common/activity/loader";
import { ToastAndroid } from "react-native";
const loginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const storeUserData = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("User data saved to AsyncStorage:", user);
    } catch (error) {
      console.error("Failed to store user data:", error);
    }
  };

  const onSubmit = async (data: {
    username: String;
    password: String;
    phone: String;
  }) => {
    setLoading(true);

    try {
      const postData = {
        identifier: data.username || data.phone,
        password: data.password,
      };
      const response = await loginUser(postData);
      setUser(response);
      if (response.message === "Login successful") {
        ToastAndroid.show("Login successful", ToastAndroid.SHORT);
        await storeUserData(response.user);
        router.push({
          pathname: "/(tabs)",
          params: { userDetails: JSON.stringify(response.user) },
        });
        setLoading(false);
      } else if (response.message === "Invalid Username or Password") {
        ToastAndroid.show("Invalid Username or Password", ToastAndroid.SHORT);
        setLoading(false);
      }
    } catch (error) {
      ToastAndroid.show("Failed to fetch data", ToastAndroid.SHORT);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1 bg-[#E3F4F4]"
      alwaysBounceVertical={true}
      scrollEnabled={true}
      bounces={false}
    >
      <View className="justify-between items-center p-6">
        <View className="w-full h-1/3 mb-4">
          <Lottie
            source={require("../../assets/images/signup.json")}
            autoPlay
            loop
            className="w-full h-full"
          />
        </View>
        <View className="flex-col justify-start items-center mt-4 space-x-4">
          <Text className="text-black text-2xl font-extrabold text-center mb-2">
            Start Cooking
          </Text>
        </View>

        {/* userName Input */}
        <Controller
          control={control}
          name="username"
          rules={{ required: "username is required" }}
          render={({ field: { onChange, value } }) => (
            <>
              <InputBox
                value={value}
                placeholder={"Vishal5464/9078434144"}
                onChangeText={onChange}
                keyboardType={"default"}
                icon={"user"}
                secure={undefined}
              />
              {errors.username && (
                <Text className="text-red-500">{errors.username.message}</Text>
              )}
            </>
          )}
        />
        {/* Password Input */}
        <View className="w-full relative">
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <InputBox
                  value={value}
                  placeholder={"********"}
                  onChangeText={onChange}
                  keyboardType={"default"}
                  secure={!isPasswordVisible ? true : false}
                  icon={"lock"}
                />
                {errors.password && (
                  <Text className="text-red-500 justify-center">
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: "absolute", right: 20, top: 25 }}
          >
            <FontAwesome
              username={isPasswordVisible ? "eye-slash" : "eye"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => {
            router.push("/AuthPage/forgotPasswordScreen");
          }}
          className="w-full items-end"
        >
          <Text className=" text-right text-black font-semibold">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        {/* Submit Button */}
        <View className="w-full px-16 justify-between mt-4 space-x-4">
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button
              buttonText={loading ? "Please Wait" : "Login"}
              onPress={loading ? undefined : handleSubmit(onSubmit)}
              buttonStyle={
                "bg-yellow-400 py-2 px-6 rounded-full shadow-lg items-center"
              }
              textStyle="text-lg text-black font-semibold"
            />
          )}
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Text
            className="text-center text-black font-semibold"
            onPress={() => {
              router.push("/AuthPage/SignupScreen");
            }}
          >
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default loginScreen;
