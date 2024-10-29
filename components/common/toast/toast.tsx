import { ToastAndroid, Platform } from "react-native";

export const showToast = (
  message,
  duration = ToastAndroid.SHORT,
  position = ToastAndroid.BOTTOM
) => {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravity(message, duration, position);
  } else {
    console.warn("Toast is only available on Android");
  }
};
