import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { updateUser } from "@/api/auth/update";
import { ToastAndroid } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";

export default function Settings() {
  const router = useRouter();
  const { userDetails } = useLocalSearchParams();
  const [parsedUser, setParsedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
        ToastAndroid.show("Profile updated successfully.", ToastAndroid.SHORT);
        await storeUserData(parsedUser).then(() => {
          router.replace("/SplashPage/welcome");
        });
        setIsEditing(false);
        setCurrentPassword("");
        setNewPassword("");
      } else {
        Alert.alert("Error", response.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  return parsedUser == null ? (
    <ActivityIndicator />
  ) : (
    <ScrollView className="bg-white">
      <LinearGradient
        colors={["#a8e063", Colors.tabColor]}
        start={[0, 0]}
        end={[1, 0]}
        className="rounded-b-3xl relative mb-4"
      >
        <View>
          <TouchableOpacity
            onPress={async () => {
              await storeUserData(null).then(() => {
                router.replace("/AuthPage/wrapper");
              });
            }}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <FontAwesome name="sign-out" size={24} color="white" />
          </TouchableOpacity>
          <View className="items-center justify-center">
            <View className="mt-4 mb-8 items-center">
              <Text className="text-xl font-bold">{parsedUser.username}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View className="px-6">
        <View className="mb-4">
          <Text className="text-sm text-black">Name</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl px-2">
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
          <Text className="text-sm text-black">Email</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl px-2">
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
          <Text className="text-sm text-black">Phone number</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl px-2">
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
          <Text className="text-sm text-black">New Password</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl px-2">
            <TextInput
              value={newPassword}
              secureTextEntry={true}
              editable={isEditing}
              onChangeText={(text) => setNewPassword(text)}
              className="flex-1 py-2 text-base"
            />
            <FontAwesome name="lock" size={20} color="gray" />
          </View>
        </View>

        {/** Current Password Input **/}
        <View className="mb-8">
          <Text className="text-sm text-black">Current Password</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl px-2">
            <TextInput
              value={currentPassword}
              secureTextEntry={true}
              editable={isEditing}
              onChangeText={(text) => setCurrentPassword(text)}
              className="flex-1 py-2 text-base"
            />
            <FontAwesome name="lock" size={20} color="gray" />
          </View>
        </View>

        {isEditing ? (
          <TouchableOpacity
            onPress={handleUpdateProfile}
            className="bg-green-500 rounded-full py-3 shadow-md mx-20 mb-4"
          >
            <Text className="text-center text-white text-base">
              Save Profile
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            className="bg-purple-500 rounded-full py-3 shadow-md mx-20 mb-4"
          >
            <Text className="text-center text-white text-base">
              Edit Profile
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
