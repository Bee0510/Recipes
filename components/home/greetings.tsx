import { Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import CustomText from "../../components/common/header/textComponent";

const greetings = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "custom-font": require("../../assets/fonts/Nunito-Regular.ttf"),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-col">
          <CustomText
            title={"Hello, Anne"}
            fontSize={"text-base"}
            color={"text-gray-400"}
          />
          <CustomText
            title={"What would you like to cook today?"}
            fontSize={"text-xl"}
            Fontweight={"font-bold"}
            color={"text-black"}
            textwidth={"w-2/3"}
          />
        </View>
        <Image
          source={{
            uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.GPFEY6kfgxbsja6gmrW6rwAAAA%26pid%3DApi&f=1&ipt=94155defd0bff44f947d2d3c6ba4c67c03304006312ce6e493bb05eed8c6a7b5&ipo=images",
          }}
          className="w-12 h-12 rounded-full"
        />
      </View>
    </View>
  );
};

export default greetings;
