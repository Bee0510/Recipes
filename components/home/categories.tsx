import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../common/header/textComponent";
const CategortList = [
  {
    id: "0",
    name: "None",
    icon: require("../../assets/images/lunch.png"),
  },
  {
    id: "1",
    name: "Veg",
    icon: require("../../assets/images/lunch.png"),
  },
  {
    id: "2",
    name: "Non-Veg",
    icon: require("../../assets/images/dinner.png"),
  },
];
const mealTypeList = [
  // {
  //   id: "1",
  //   name: "Lunch",
  //   icon: require("../../assets/images/lunch.png"),
  // },
  // {
  //   id: "2",
  //   name: "Dinner",
  //   icon: require("../../assets/images/dinner.png"),
  // },
  // {
  //   id: "3",
  //   name: "Breakfast",
  //   icon: require("../../assets/images/breakfast.png"),
  // },
  // {
  //   id: "8",
  //   name: "None",
  //   icon: require("../../assets/images/dinner.png"),
  // },
  {
    id: "5",
    name: "Main Course",
    icon: require("../../assets/images/dinner.png"),
  },
  {
    id: "4",
    name: "Snack",
    icon: require("../../assets/images/dinner.png"),
  },
  {
    id: "6",
    name: "Appetizer",
    icon: require("../../assets/images/dinner.png"),
  },
  {
    id: "7",
    name: "Dessert",
    icon: require("../../assets/images/dinner.png"),
  },
];

const Categories = ({ selectedCategoryname, setSelectedCategoryname }) => {
  return (
    <View className="flex-col mt-[30px]">
      <CustomText
        title={"Categories"}
        fontSize={"text-lg"}
        Fontweight={"font-medium"}
        color={"text-black"}
      />
      <View className="h-[10px] w-[100%]"></View>

      {/* Meal Type Filter */}
      <FlatList
        data={mealTypeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-6"></View>}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategoryname(item.id)}
            className={`${
              item.id === selectedCategoryname ? "bg-green-500" : "bg-white"
            } p-2 rounded-lg items-center justify-center shadow-sm flex-row space-x-2`}
          >
            {/* Meal Type Label */}
            <Text
              className={`${
                item.id === selectedCategoryname ? "text-white" : "text-black"
              } text-sm font-medium`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
