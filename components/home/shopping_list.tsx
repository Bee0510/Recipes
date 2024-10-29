// ShoppingListScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../constants/colors";
const ShoppingListScreen = ({ userDetails }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/shopping/shopping",
          params: {
            userDetails: JSON.stringify(userDetails),
          },
        })
      }
    >
      <LinearGradient
        colors={["#a8e063", colors.tabColor]}
        start={[0, 0]}
        end={[1, 0]}
        className="rounded-lg mt-5"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Shopping List</Text>
          <AntDesign name="right" size={20} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    color: "white",
    borderColor: "black",
  },
});
