import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Slider = () => {
  const navigation = useNavigation();

  const handleStartHere = () => {
    navigation.navigate("Login");
  };

  return (
    <LinearGradient
      colors={["#0D1B2A", "#10E0F0"]}
      style={styles.container}
      start={{ x: 0.5, y: 0.3 }}
      end={{ x: 0.5, y: 1 }}
    >
      <StatusBar style="auto" />
      <Image source={require("../../images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>CryptoCamGuard</Text>

      <Text style={styles.paragraph}>
        CryptoCamGuard provides top-tier security with advanced encryption,
        ensuring your footage is always protected and private. Receive real-time
        alerts for suspicious activities and integrate seamlessly with existing
        security systems. Enjoy reliable storage options on the cloud or local
        encrypted drives, keeping your data safe and accessible
      </Text>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleStartHere}
      >
        <Text style={styles.buttonText}>Start Here</Text>
        <AntDesign name="arrowright" size={20} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },

  createAccountButton: {
    backgroundColor: "#0a6c76",
    flexDirection: "row",
    borderRadius: 30,
    marginTop: 30,
    justifyContent: "center",
    padding: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    gap: 10,
  },
  paragraph: {
    color: "#fff",
    marginBottom: 20,
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
  },
});

export default Slider;
