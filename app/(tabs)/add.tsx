import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function add() {
  return (
    <View style={styles.container}>
      <Text>Tab [add]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
