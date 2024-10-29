import { Text, View, Switch, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import CustomText from "../../components/common/header/textComponent";
import { LinearGradient } from "expo-linear-gradient";

const Greetings = ({
  userDetails,
  onToggle,
  selectCategory,
  setSelectedCategory,
}) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isVeg, setIsVeg] = useState(false);

  useEffect(() => {
    console.log("Selected Category:", selectCategory);
    async function loadFont() {
      try {
        await Font.loadAsync({
          "custom-font": require("../../assets/fonts/Nunito-Regular.ttf"),
        });
        setFontLoaded(true);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  const toggleSwitch = (value) => {
    setIsVeg(value);
    if (onToggle) {
      onToggle(value ? "veg" : "all");
      setSelectedCategory(value ? "veg" : "all");
      console.log("Selected Category:", selectCategory);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {/* Greeting Section */}
        <View style={styles.greetingContainer}>
          <CustomText
            title={`Hello ${userDetails.name}`}
            fontSize="text-base"
            color="text-gray-400"
            Fontweight="font-regular"
          />
          <CustomText
            title="What would you like to cook today?"
            fontSize="text-base"
            Fontweight="font-bold"
            color="text-black"
            textwidth="w-2/3"
          />
        </View>

        {/* Switch Section */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>{isVeg ? "Veg" : "All"}</Text>
          <Switch
            trackColor={{ false: "red", true: "green" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isVeg}
          />
        </View>
      </View>
    </View>
  );
};

export default Greetings;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 16,
  },
  greetingContainer: {
    flexDirection: "column",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    marginRight: 2,
    fontSize: 16,
    color: "#4B5563",
    fontFamily: "custom-font",
  },
});
