import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import ItemCard from "../../components/common/cards/item_card";
import { useLocalSearchParams, useRouter } from "expo-router";
import { searchRecipe } from "@/api/recipes/search";
import Loader from "../../components/common/activity/loader";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userDetails } = useLocalSearchParams();
  const [parsedUser, setParsedUser] = useState(null);

  useEffect(() => {
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
  }, [userDetails]);
  const handleSearch = async (text) => {
    setSearchText(text);
    setLoading(true);
    try {
      const response = await searchRecipe(text);
      if (response) {
        setSearchResults(response);
        console.log("Search Results:", searchResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-row items-center bg-gray-200 rounded-full p-2 mx-4 mt-4">
        <TextInput
          className="flex-1 ml-2 text-gray-900"
          placeholder="Search items..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          placeholderTextColor="#6B7280"
        />
        <View className="h-full w-[2px] bg-black"></View>
        <Pressable className="p-2" onPress={() => handleSearch(searchText)}>
          <FontAwesome name="search" size={20} className="text-gray-500" />
        </Pressable>
      </View>
      {loading ? (
        <Loader />
      ) : searchResults.length == 0 ? (
        <View className=" items-center justify-center h-[70%] w-full">
          <Text className="text-gray-500 text-base">Search Something</Text>
        </View>
      ) : (
        <FlatList
          className="flex-1 bg-gray-100 mt-2"
          data={[searchResults]}
          scrollEnabled={true}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ItemCard
              onpress={() =>
                router.push({
                  pathname: "/recipe/RecipeScreen",
                  params: {
                    items: JSON.stringify(item),
                    userDetails: userDetails,
                  },
                })
              }
              item={item}
            />
          )}
          ListEmptyComponent={() => (
            <View className="mt-10 items-center">
              <Text className="text-gray-500 text-base items-center justify-center">
                Search Something
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
