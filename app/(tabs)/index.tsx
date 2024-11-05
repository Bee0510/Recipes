import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Greetings from "../../components/home/greetings";
import Search from "../../components/home/search";
import Category from "../../components/home/categories";
import Recommendation from "../../components/home/recommendation";
import easyrecipe from "@/components/home/easyrecipe";
import Toprecipes from "../../components/home/toprecipes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import ShoppingListScreen from "@/components/home/shopping_list";
import Easyrecipe from "@/components/home/easyrecipe";

export default function index() {
  const { userDetails } = useLocalSearchParams();
  const [parsedUser, setParsedUser] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [selectedCategoryname, setSelectedCategoryname] = useState("5");

  useFocusEffect(
    React.useCallback(() => {
      if (userDetails) {
        try {
          const user = JSON.parse(userDetails);
          setParsedUser(user);
        } catch (error) {
          console.error("Failed to parse userDetails:", error);
        }
      } else {
        console.log("No userDetails received.");
      }
    }, [userDetails])
  );
  return (
    parsedUser && (
      <SafeAreaView>
        <ScrollView
          className="flex-col px-[16px]"
          showsVerticalScrollIndicator={false}
        >
          <Greetings
            userDetails={parsedUser}
            onToggle={setSelectedCategoryId}
            selectCategory={selectedCategoryId}
            setSelectedCategory={setSelectedCategoryId}
          />
          <Search />
          <ShoppingListScreen userDetails={parsedUser} />
          <Category
            selectedCategoryname={selectedCategoryname}
            setSelectedCategoryname={setSelectedCategoryname}
          />
          <Recommendation
            userDetails={parsedUser}
            selectedCategoryId={selectedCategoryId}
            selectedCategoryname={selectedCategoryname}
          />
          <Easyrecipe
            userDetails={parsedUser}
            selectedCategoryId={selectedCategoryId}
            selectedCategoryname={selectedCategoryname}
          />
          <Toprecipes
            userDetails={parsedUser}
            selectedCategoryId={selectedCategoryId}
            selectedCategoryname={selectedCategoryname}
          />
          <View className="h-[40px]"></View>
        </ScrollView>
      </SafeAreaView>
    )
  );
}
