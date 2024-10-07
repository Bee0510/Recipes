import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function search() {
  return (
    <View style={styles.container}>
      <Text>Tab [Search]</Text>
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
