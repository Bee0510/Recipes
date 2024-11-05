import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import Lottie from "lottie-react-native";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/common/cards/button";
import InputBox from "../../components/auth/textinput";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { resetPassword } from "@/api/auth/forgot_password";
import { showToast } from "@/components/common/toast/toast";

const forgotpasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      email: "",
      pin: "",
      newPassword: "",
    },
  });

  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (data: {
    identifier: String;
    email: String;
    pin: String;
    newPassword: String;
  }) => {
    setLoading(true);
    try {
      const response = await resetPassword(data);
      if (response.message === "Password reset successfully") {
        router.back();
        ToastAndroid.show(
          "Password reset successful. Login with new password",
          ToastAndroid.LONG
        );
        router.replace("/SplashPage/welcome");
      } else {
        showToast(response.message);
      }
      setLoading(false);
    } catch (error) {
      showToast(error.message);
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
            source={require("../../assets/images/bowl.json")}
            autoPlay
            loop
            className="w-full h-full"
          />
        </View>
        <View className="flex-col justify-start items-center mt-4 space-x-4">
          <Text className="text-black text-2xl font-extrabold text-center mb-2">
            Reset Password
          </Text>
        </View>

        {/* Identifier Input (Username/Phone) */}
        <Controller
          control={control}
          name="identifier"
          rules={{ required: "Username or Phone is required" }}
          render={({ field: { onChange, value } }) => (
            <>
              <InputBox
                value={value}
                placeholder={"Username or Phone"}
                onChangeText={onChange}
                keyboardType={"default"}
                icon={"user"}
                secure={undefined}
              />
              {errors.identifier && (
                <Text className="text-red-500">
                  {errors.identifier.message}
                </Text>
              )}
            </>
          )}
        />

        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <InputBox
                value={value}
                placeholder={"your-email@example.com"}
                onChangeText={onChange}
                keyboardType={"email-address"}
                icon={"envelope"}
                secure={undefined}
              />
              {errors.email && (
                <Text className="text-red-500">{errors.email.message}</Text>
              )}
            </>
          )}
        />

        {/* Pin Input */}
        <Controller
          control={control}
          name="pin"
          rules={{
            required: "Pin is required",
            minLength: {
              value: 6,
              message: "Enter a valid 6-digit pin",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <InputBox
                value={value}
                placeholder={"Enter your security pin"}
                onChangeText={onChange}
                keyboardType={"numeric"}
                icon={"shield"}
                secure={undefined}
              />
              {errors.pin && (
                <Text className="text-red-500">{errors.pin.message}</Text>
              )}
            </>
          )}
        />

        {/* New Password Input */}
        <View className="w-full relative">
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: "New Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <InputBox
                  value={value}
                  placeholder={"New Password"}
                  onChangeText={onChange}
                  keyboardType={"default"}
                  secure={!isPasswordVisible}
                  icon={"lock"}
                />
                {errors.newPassword && (
                  <Text className="text-red-500 justify-center">
                    {errors.newPassword.message}
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
              name={isPasswordVisible ? "eye-slash" : "eye"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <View className="w-full px-16 justify-between mt-4 space-x-4">
          <Button
            buttonText={loading ? "Please Wait" : "Reset Password"}
            onPress={loading ? undefined : handleSubmit(onSubmit)}
            buttonStyle={
              "bg-yellow-400 py-2 px-6 rounded-full shadow-lg items-center"
            }
            textStyle="text-lg text-black font-semibold"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default forgotpasswordScreen;
