import React from "react";
import { View, Text, ScrollView } from "react-native";
import Greetings from "../../components/home/greetings";
import Search from "../../components/home/search";
import Category from "../../components/home/categories";
import Recommendation from "../../components/home/recommendation";
import Toprecipes from "../../components/home/toprecipes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  return (
    <SafeAreaView>
      <ScrollView className="flex-col p-[16px] mt-[10px]">
        <Greetings />
        <Search />
        <Category />
        <Recommendation />
        <Toprecipes />
        <View className="h-[40px]"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
