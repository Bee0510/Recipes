import { deleteShopByUser } from "@/api/shopping/delete_shop_list";
import { getShopItemById } from "@/api/shopping/get_shop_by_user";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/colors";
import { showToast } from "@/components/common/toast/toast";

const shopping = () => {
  const router = useRouter();
  const user = useLocalSearchParams();
  const userDetails = JSON.parse(user.userDetails);
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getShoppingList = async () => {
    try {
      const response = await getShopItemById(userDetails.id);
      setShoppingList(response.data);
      console.log("Shopping List:", response.data);
    } catch (error) {
      console.error("Failed to fetch shopping list:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteShopList = async (cartId: any) => {
    try {
      const response = await deleteShopByUser(userDetails.id, cartId);
      console.log("Delete Response:", response);
      if (response.message === "List deleted successfully") {
        showToast("List deleted successfully");
      }
      getShoppingList();
    } catch (error) {
      console.error("Failed to delete shopping list:", error);
    }
  };
  useEffect(() => {
    getShoppingList();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <LinearGradient
        colors={["#a8e063", Colors.tabColor]}
        start={[0, 0]}
        end={[1, 0]}
      >
        <View className="flex-row items-center justify-start px-4 py-2">
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-white text-center w-[90%]">
            shopping List
          </Text>
        </View>
      </LinearGradient>
      {/* shopping List Content */}
      <ScrollView className="m-4">
        {shoppingList.length > 0 ? (
          shoppingList.map((item, index) => (
            <View
              key={item._id || index}
              className="mb-6 bg-gray-300 rounded-lg px-2"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-bold mb-1">
                  {item.recipeName}
                </Text>
                <TouchableOpacity onPress={() => deleteShopList(item.cartId)}>
                  <Text className="text-red-500">Delete</Text>
                </TouchableOpacity>
              </View>

              <View className="h-[1px] bg-white"></View>
              {item.ingredients.map((ingredient: string, idx: number) => (
                <Text key={idx} className="text-base mb-1">
                  {ingredient}
                </Text>
              ))}
            </View>
          ))
        ) : (
          <Text className="text-center text-gray-500">No items found</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default shopping;
