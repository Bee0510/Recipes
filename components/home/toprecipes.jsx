import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomText from "../../components/common/header/textComponent";
const toprecipeItems = [
  {
    id: "1",
    title: "Cheese Volcano Pizza",
    author: "Lorem nqejnjenn dnwdndnd w jd  jwddnwjdn jdwjd d",
    image: require("../../assets/images/pizza.jpg"),
  },
  {
    id: "2",
    title: "Macarons",
    author:
      "Rachel WilliamLorem nqejnjenn dnwdndnd w jd  jwddnwjdn jdwjd dLorem nqejnjenn dnwdndnd w jd ",
    image: require("../../assets/images/salad.jpg"),
  },
  {
    id: "3",
    title: "Chicken Salad",
    author: "Samantha Brown",
    image: require("../../assets/images/pizza.jpg"),
  },
];
const toprecipes = () => {
  return (
    <View className="flex-col mt-[30px]">
      <CustomText
        title={"Top Recipes Of The Day"}
        fontSize={"text-lg"}
        Fontweight={"font-medium"}
        color={"text-black"}
      />
      <View className="h-[10px]"></View>
      <FlatList
        data={toprecipeItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-white p-3 rounded-xl mr-4 shadow-md w-60">
            <Image
              source={item.image}
              className="w-full h-36 rounded-lg mb-2"
              resizeMode="cover"
            />
            <View className=" h-12">
              <Text className="text-base font-semibold text-black overflow-hidden">
                {item.title}
              </Text>
            </View>
            <Text className="text-xs font-medium text-gray-500">
              By {item.author}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default toprecipes;
