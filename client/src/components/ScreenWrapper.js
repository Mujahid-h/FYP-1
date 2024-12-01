import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ScreenWrapper = ({ children }) => {
  return (
    <LinearGradient
      colors={["#074951", "#0e8d9c"]}
      start={{ x: 0.5, y: 0.2 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.linearGradient}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default ScreenWrapper;
