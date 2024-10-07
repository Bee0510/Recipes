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
    id: "1",
    name: "Breakfast",
    icon: require("../../assets/images/breakfast.png"),
  },
  {
    id: "2",
    name: "Lunch",
    icon: require("../../assets/images/lunch.png"),
  },
  {
    id: "3",
    name: "Dinner",
    icon: require("../../assets/images/dinner.png"),
  },
  {
    id: "4",
    name: "Dessert",
    icon: require("../../assets/images/desert.png"),
  },
  {
    id: "5",
    name: "Snacks",
    icon: require("../../assets/images/snacks.png"),
  },
];
const categories = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("1");
  return (
    <View className="flex-col mt-[30px]">
      <CustomText
        title={"Categories"}
        fontSize={"text-lg"}
        Fontweight={"font-medium"}
        color={"text-black"}
      />
      <View className="h-[10px]"></View>
      <FlatList
        data={CategortList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategoryId(item.id)}
            className={`${
              item.id == selectedCategoryId ? "bg-green-500" : "bg-white"
            } p-3 rounded-lg mr-3 items-center justify-center shadow-sm`}
          >
            {/* Category Icon */}
            <Image
              source={item.icon}
              className="w-12 h-12 mb-1"
              resizeMode="contain"
            />
            {/* Category Label */}
            <Text
              className={`${
                item.isSelected ? "text-white" : "text-black"
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

export default categories;

const styles = StyleSheet.create({});
