import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { updateUser } from "@/api/auth/update";
import { ToastAndroid } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import avatars from "@/constants/avatars";
import { showToast } from "@/components/common/toast/toast";

export default function Settings() {
  const router = useRouter();
  const { userDetails } = useLocalSearchParams();
  const [parsedUser, setParsedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setIsPasswordVisible2(!isPasswordVisible2);
  };

  const storeUserData = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("User data saved to AsyncStorage:", user);
    } catch (error) {
      console.error("Failed to store user data:", error);
    }
  };

  useEffect(() => {
    if (userDetails) {
      try {
        const user = JSON.parse(userDetails);
        delete user.password;
        setParsedUser(user);
        console.log("Parsed User:", user);
      } catch (error) {
        console.error("Failed to parse userDetails:", error);
      }
    } else {
      console.log("No userDetails received.");
    }
  }, [userDetails]);

  const handleUpdateProfile = async () => {
    if (currentPassword === "") {
      showToast("Please enter your current password.");
      return;
    } else if (
      parsedUser.name === "" ||
      parsedUser.email === "" ||
      parsedUser.phone === ""
    ) {
      showToast("Please enter all required fields.");
      return;
    } else
      try {
        const response = await updateUser({
          identifier: parsedUser.username,
          password: currentPassword,
          newName: parsedUser.name,
          newPhone: parsedUser.phone,
          newEmail: parsedUser.email,
          newPassword: newPassword,
        });
        if (response.message === "User updated successfully") {
          ToastAndroid.show(
            "Profile updated successfully.",
            ToastAndroid.SHORT
          );
          await storeUserData(parsedUser).then(() => {
            router.replace("/SplashPage/welcome");
          });
          setIsEditing(false);
          setCurrentPassword("");
          setNewPassword("");
        } else {
          showToast(response.message);
        }
      } catch (error) {
        console.error("Failed to update profile:", error);
        Alert.alert("Error", "Failed to update profile.");
      }
  };

  return parsedUser == null ? (
    <ActivityIndicator />
  ) : (
    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
      {/* <View className="rounded-b-3xl relative">
        <View className="items-center justify-center">
          <View className="mt-4 mb-8 items-center bg-green-500 rounded-xl px-4 py-2">
            <Text className="text-xl font-semibold text-white">
              {parsedUser.username}
            </Text>
          </View>
        </View>
      </View> */}

      <View className="px-6 mt-3">
        <View className="mb-4">
          <View className="items-center">
            <View className="rounded-full justify-between bg-green-500">
              <Image
                source={avatars[parsedUser.avatar]}
                resizeMode="cover"
                className="w-[80px] h-[80px] rounded-full items-center m-1"
              />
            </View>
            <Text className="text-xl font-semibold text-black text-center">
              {parsedUser.username}
            </Text>
          </View>
          <Text className="text-sm text-black mb-1 font-medium">Name</Text>
          <View className="flex-row items-center border border-gray-400 rounded-xl px-2">
            <TextInput
              value={parsedUser.name}
              editable={isEditing}
              onChangeText={(text) =>
                setParsedUser({ ...parsedUser, name: text })
              }
              className="flex-1 py-2 text-base"
            />
            <FontAwesome name="user" size={20} color="gray" />
          </View>
        </View>
        <View className="mb-4">
          <Text className="text-sm text-black mb-1 font-medium">Email</Text>
          <View className="flex-row items-center border border-gray-400 rounded-xl px-2">
            <TextInput
              value={parsedUser.email}
              editable={isEditing}
              onChangeText={(text) =>
                setParsedUser({ ...parsedUser, email: text })
              }
              className="flex-1 py-2 text-base"
            />
            <FontAwesome name="envelope" size={20} color="gray" />
          </View>
        </View>
        <View className="mb-4">
          <Text className="text-sm text-black mb-1 font-medium">
            Phone Number
          </Text>
          <View className="flex-row items-center border border-gray-400 rounded-xl px-2">
            <TextInput
              value={parsedUser.phone}
              editable={isEditing}
              onChangeText={(text) =>
                setParsedUser({ ...parsedUser, phone: text })
              }
              className="flex-1 py-2 text-base"
            />
            <FontAwesome name="phone" size={20} color="gray" />
          </View>
        </View>

        {/** New Password Input **/}
        <View className="mb-4">
          <Text className="text-sm text-black mb-1 font-medium">
            New Password
          </Text>
          <View className="flex-row items-center border border-gray-400 rounded-xl px-2">
            <TextInput
              value={newPassword}
              secureTextEntry={true}
              editable={isEditing}
              secureTextEntry={!isPasswordVisible2 ? true : false}
              onChangeText={(text) => setNewPassword(text)}
              className="flex-1 py-2 text-base"
            />
            <TouchableOpacity onPress={togglePasswordVisibility2}>
              <FontAwesome
                name={isPasswordVisible2 ? "eye-slash" : "eye"}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/** Current Password Input **/}
        <View className="mb-4">
          <Text className="text-sm text-black mb-1 font-medium">
            Current Password
          </Text>
          <View className="flex-row items-center border border-gray-400 rounded-xl px-2">
            <TextInput
              value={currentPassword}
              secureTextEntry={true}
              editable={isEditing}
              secureTextEntry={!isPasswordVisible ? true : false}
              onChangeText={(text) => setCurrentPassword(text)}
              className="flex-1 py-2 text-base"
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <FontAwesome
                name={isPasswordVisible ? "eye-slash" : "eye"}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        {isEditing ? (
          <TouchableOpacity
            onPress={handleUpdateProfile}
            className="bg-green-500 rounded-full py-2 shadow-md mx-24 mb-4"
          >
            <Text className="text-center text-white text-base font-semibold">
              Save Profile
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            className="bg-yellow-400 rounded-full py-2 shadow-md mx-24 mb-4"
          >
            <Text className="text-center text-white text-base font-semibold">
              Edit Profile
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={async () => {
            await storeUserData(null).then(() => {
              router.replace("/AuthPage/wrapper");
            });
          }}
          className="bg-red-500 rounded-full py-2 shadow-md mx-20 mb-4 items-center justify-center"
        >
          {/* <FontAwesome name="sign-out" size={24} color="white" /> */}
          <Text className="text-white text-base font-bold">Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/privacy/privacy_policy")}
          className="mt-2 px-3"
        >
          <Text className="text-blue-500 text-base font-bold text-center">
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <Text className="text-center text-sm text-gray-500 mt-1 mb-7">
          Version v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}
