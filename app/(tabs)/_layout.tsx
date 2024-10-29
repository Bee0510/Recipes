import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { Tabs, useRouter, useLocalSearchParams } from "expo-router";

export default function TabLayout() {
  const router = useRouter();
  const { userDetails } = useLocalSearchParams();
  useEffect(() => {
    if (userDetails) {
      console.log(`User:${userDetails}`);
    } else {
      console.log("No User");
    }
  }, [userDetails]);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: colors.tabColor,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      {/* Tab 1: Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
        initialParams={{ userDetails: userDetails || null }}
      />

      {/* Tab 2: Search */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="search" color={color} />
          ),
        }}
        initialParams={{ userDetails: userDetails || null }}
      />

      {/* Centered Notch Button */}
      {/* <Tabs.Screen
        name="add"
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              style={styles.notchButton}
              onPress={() => router.navigate("add")}
            >
              <FontAwesome name="plus" size={26} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      /> */}

      {/* Tab 3: Favorites */}
      <Tabs.Screen
        name="save"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="heart" color={color} />
          ),
        }}
        initialParams={{ userDetails: userDetails || null }}
      />

      {/* Tab 4: Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user" color={color} />
          ),
        }}
        initialParams={{ userDetails: userDetails || null }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    backgroundColor: "#000000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    bottom: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 5,
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  notchButton: {
    width: 55,
    height: 55,
    borderRadius: 35,
    backgroundColor: colors.buttonColor,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
