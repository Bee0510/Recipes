import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const privacy_policy = () => {
  const router = useRouter();
  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Privacy Policy
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Last updated: November 04, 2024
      </Text>
      <Text style={{ marginBottom: 10 }}>
        This Privacy Policy describes Our policies and procedures on the
        collection, use, and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
      </Text>
      <Text style={{ marginBottom: 10 }}>
        We use Your Personal data to provide and improve the Service. By using
        the Service, You agree to the collection and use of information in
        accordance with this Privacy Policy.
      </Text>
      <Text
        style={{ color: "blue", marginBottom: 20 }}
        onPress={() =>
          Linking.openURL(
            "https://www.termsfeed.com/live/f7ec943e-0e50-4a9f-8a50-a8a85d0a43a4"
          )
        }
      >
        Privacy Policy URL
      </Text>

      {/* Interpretation and Definitions */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Interpretation and Definitions
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Interpretation
      </Text>
      <Text style={{ marginBottom: 10 }}>
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions.
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Definitions
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Account:</Text>
        <Text>
          {" "}
          A unique account created for You to access our Service or parts of our
          Service.
        </Text>
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>Affiliate:</Text>
        <Text>
          {" "}
          An entity that controls, is controlled by, or is under common control
          with a party...
        </Text>
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>Application:</Text>
        <Text>
          {" "}
          Refers to Recipease, the software program provided by the Company.
        </Text>
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>Company:</Text>
        <Text> Refers to Recipease.</Text>
      </View>

      {/* Collecting and Using Your Personal Data */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Collecting and Using Your Personal Data
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Types of Data Collected
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Personal Data:</Text>
        <Text>
          {" "}
          We may ask You to provide certain personally identifiable information
          including:
        </Text>
        <Text>- Email address</Text>
        <Text>- First name and last name</Text>
        <Text>- Phone number</Text>
      </View>

      {/* Use of Your Personal Data */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Use of Your Personal Data
      </Text>
      <Text style={{ marginBottom: 10 }}>
        The Company may use Personal Data for purposes such as providing and
        maintaining our Service, managing Your Account...
      </Text>

      {/* Security and Retention */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Security of Your Personal Data
      </Text>
      <Text style={{ marginBottom: 10 }}>
        The security of Your Personal Data is important to Us, but remember that
        no method of transmission over the Internet is 100% secure.
      </Text>

      {/* Children’s Privacy */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Children’s Privacy
      </Text>
      <Text style={{ marginBottom: 10 }}>
        Our Service does not address anyone under the age of 13. We do not
        knowingly collect personal information from children under 13.
      </Text>

      {/* Contact Us */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Contact Us
      </Text>
      <Text>If you have any questions, you can contact us:</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ marginBottom: 50 }}>Email: </Text>
        <Text
          style={{ color: "blue", marginBottom: 20 }}
          onPress={() => Linking.openURL("mailto: beheravishal19@gmail.com")}
        >
          beheravishal19@gmail.com
        </Text>
      </View>
    </ScrollView>
  );
};

export default privacy_policy;
