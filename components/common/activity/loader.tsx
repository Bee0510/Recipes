import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Lottie from "lottie-react-native";
const { width, height } = Dimensions.get("window");

const Loader = () => {
  const [animationIndex, setAnimationIndex] = useState(0);
  const animations = [
    require("../../../assets/images/pan.json"),
    require("../../../assets/images/cooker.json"),
    require("../../../assets/images/bowl.json"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prevIndex) => (prevIndex + 1) % animations.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Lottie
        source={animations[animationIndex]}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  animation: {
    width: width * 0.3,
    height: height * 0.3,
  },
});

export default Loader;
