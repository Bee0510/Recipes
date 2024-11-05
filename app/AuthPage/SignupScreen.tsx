import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";
import Lottie from "lottie-react-native";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/common/cards/button";
import InputBox from "../../components/auth/textinput";
import { FontAwesome } from "@expo/vector-icons";
import { registerUser } from "../../api/auth/register";
import { useRouter } from "expo-router";
import avatars from "@/constants/avatars";
import { isLoading } from "expo-font";
import { showToast } from "@/components/common/toast/toast";

const SignupScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      pin: null,
      avatar: null,
    },
  });
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null);
  const messages = [
    "Feeling Hungry?",
    "Craving Something?",
    "Register To start Cooking?",
    "Find Your Meal",
  ];
  useEffect(() => {
    const animateText = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % messages.length
        );

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start();
      });
    };

    const interval = setInterval(animateText, 1000);
    return () => clearInterval(interval);
  }, []);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (data: {
    name: String;
    phone: String;
    email: String;
    password: String;
    pin: String;
  }) => {
    setLoading(true);

    try {
      const postData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        pin: data.pin,
        avatar: selectedAvatarIndex,
      };
      if (selectedAvatarIndex === null) {
        ToastAndroid.show("Please select an avatar", ToastAndroid.SHORT);
        setLoading(false);
      } else {
        const response = await registerUser(postData);
        setUser(response);
        if (response.message === "User registered successfully") {
          ToastAndroid.show(
            "User registered successfully. Login now to cook",
            ToastAndroid.LONG
          );
          router.replace("/SplashPage/welcome");
          setLoading(false);
        } else if (response.message === "User Already Exists") {
          // Alert.alert("Success", "User Already Exists");
          showToast("User Already Exists");
          setLoading(false);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data");
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
      <View className="justify-center items-center p-6">
        <View className="w-full h-[100px] mb-4">
          <Lottie
            source={require("../../assets/images/signup.json")}
            autoPlay
            loop
            className="w-full h-full"
          />
        </View>
        <View className="flex-col justify-start items-center space-x-4 mb-6">
          <Animated.Text
            style={{ opacity: fadeAnim }}
            className="flex-1 ml-2 text-black absolute text-[20px] font-bold"
          >
            {messages[currentMessageIndex]}
          </Animated.Text>
        </View>
        <View className="w-full mt-4 mb-2">
          <Text className="text-base font-base mb-2 text-center text-green-500">
            Select your Avatar
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {avatars.map((avatar, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  console.log("Selected Avatar Index:", index);
                  setSelectedAvatarIndex(index);
                }}
                style={{ marginHorizontal: 10 }}
              >
                <Image
                  source={avatar}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 40,
                    borderWidth: selectedAvatarIndex === index ? 2 : 0,
                    borderColor:
                      selectedAvatarIndex === index ? "green" : "transparent",
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* Name Input */}
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, value } }) => (
            <>
              <InputBox
                value={value}
                placeholder={"John Doe"}
                onChangeText={onChange}
                keyboardType={"default"}
                icon={"user"}
                secure={undefined}
              />
              {errors.name && (
                <Text className="text-red-500">{errors.name.message}</Text>
              )}
            </>
          )}
        />

        {/* Phone Input */}
        <Controller
          control={control}
          name="phone"
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <InputBox
                value={value}
                placeholder={"XXXXXXXXXX"}
                onChangeText={onChange}
                keyboardType={"phone-pad"}
                icon={"phone"}
                secure={undefined}
              />
              {errors.phone && (
                <Text className="text-red-500">{errors.phone.message}</Text>
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
                placeholder={"johndoe@gmail.com"}
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

        {/* Password Input */}
        <View className="w-full relative justify-center items-center">
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
              name={isPasswordVisible ? "eye-slash" : "eye"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Pin Input */}
        <Controller
          control={control}
          name="pin"
          rules={{
            required: "Pin is required",
            minLength: {
              value: 6,
              message: "Enter a valid pin",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <InputBox
                value={value}
                placeholder={"Pin (In case you forget password)"}
                onChangeText={onChange}
                keyboardType={"phone-pad"}
                icon={"shield"}
                secure={undefined}
              />
              {errors.email && (
                <Text className="text-red-500">{errors.pin.message}</Text>
              )}
            </>
          )}
        />
        <TouchableOpacity
          onPress={() => router.push("/privacy/privacy_policy")}
          className="mt-2 items-end w-full px-3"
        >
          <Text className="text-blue-500 text-sm font-bold">
            Privacy Policy
          </Text>
        </TouchableOpacity>
        {/* Submit Button */}
        {loading ? (
          <ActivityIndicator color={"green"} />
        ) : (
          <View className="w-full px-16 justify-between mt-6 space-x-4 mb-6">
            <Button
              buttonText={loading ? "Please Wait" : "Sign Up"}
              onPress={loading ? undefined : handleSubmit(onSubmit)}
              buttonStyle={
                "bg-green-500 py-2 px-6 rounded-full shadow-lg items-center"
              }
              textStyle="text-lg text-black font-semibold"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
