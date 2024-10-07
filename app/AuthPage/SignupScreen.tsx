import React from "react";
import { ScrollView, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/common/cards/button";
import InputBox from "../../components/auth/textinput";

const SignupScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      className="flex-1 bg-[#E3F4F4]"
      alwaysBounceVertical={true}
      scrollEnabled={true}
      bounces={false}
    >
      <View className="justify-between items-center p-6">
        <View className="w-full h-2/5 mb-4">
          <Lottie
            source={require("../../assets/images/signup.json")}
            autoPlay
            loop
            className="w-full h-full"
          />
        </View>
        <View className="flex-col justify-start items-center mt-4 space-x-4">
          <Text className="text-orange-600 font-semibold text-sm mb-2">
            Sign Up for
          </Text>
          <Text className="text-black text-2xl font-extrabold text-center mb-6">
            Start Cooking
          </Text>
        </View>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputBox
              value={value}
              placeholder={"Vishal Behera"}
              onChangeText={onChange}
              keyboardType={"default"}
              icon={"user"}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <InputBox
              value={value}
              placeholder={"9078434144"}
              onChangeText={onChange}
              keyboardType={"phone-pad"}
              icon={"phone"}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputBox
              value={value}
              placeholder={"beheravishal19@gmail.com"}
              onChangeText={onChange}
              keyboardType={"email-address"}
              icon={"envelope"}
            />
          )}
        />

        <View className="w-full px-11 justify-between mt-4 space-x-4">
          <Button
            buttonText={"Sign Up"}
            onPress={handleSubmit(onSubmit)}
            buttonStyle={
              "bg-yellow-400 py-3 px-6 rounded-full shadow-lg items-center"
            }
            textStyle={"text-lg text-black font-semibold"}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
