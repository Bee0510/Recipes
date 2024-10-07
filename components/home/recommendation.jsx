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
import { useRouter } from "expo-router";
const RecommendationsItems = [
  {
    id: "1",
    title: "Creamy Pasta",
    author: "David Charles",
    image: require("../../assets/images/pizza.jpg"),
  },
  {
    id: "2",
    title: "Macarons",
    author: "Rachel William",
    image: require("../../assets/images/salad.jpg"),
  },
  {
    id: "3",
    title: "Chicken Salad",
    author: "Samantha Brown",
    image: require("../../assets/images/pizza.jpg"),
  },
];
const recommendation = ({ navigation }) => {
  const router = useRouter();
  return (
    <View className="flex-col mt-[30px]">
      <CustomText
        title={"Recommendation"}
        fontSize={"text-lg"}
        Fontweight={"font-medium"}
        color={"text-black"}
      />
      <View className="h-[10px]"></View>
      <FlatList
        data={RecommendationsItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white p-3 rounded-xl mr-4 shadow-md w-44"
            onPress={() =>
              router.push({
                pathname: "/recipe/RecipeScreen",
                params: { items: JSON.stringify(item) },
              })
            }
          >
            <Image
              source={item.image}
              className="w-full h-36 rounded-lg mb-2"
              resizeMode="cover"
            />
            <Text className="text-base font-semibold text-black">
              {item.title}
            </Text>
            <Text className="text-xs font-medium text-gray-500">
              By {item.author}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default recommendation;

const styles = StyleSheet.create({});
