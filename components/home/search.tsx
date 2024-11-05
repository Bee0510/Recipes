import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Pressable,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Search = () => {
  const router = useRouter();

  // Array of messages to display
  const messages = [
    "Feeling Hungry?",
    "Craving Something?",
    "Looking for Food?",
    "Find Your Meal",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateText = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % messages.length
        );

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    };

    const interval = setInterval(animateText, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TouchableOpacity onPress={() => router.push("/(tabs)/search")}>
      <View className="flex-row items-center bg-gray-200 rounded-full p-2">
        <FontAwesome name="search" size={20} className="text-gray-500 ml-2" />
        <Animated.Text
          style={{ opacity: fadeAnim }}
          className="flex-1 ml-2 text-gray-900"
        >
          {messages[currentMessageIndex]}
        </Animated.Text>
        <Pressable className="p-2">
          <FontAwesome name="sliders" size={20} className="text-gray-500" />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default Search;
