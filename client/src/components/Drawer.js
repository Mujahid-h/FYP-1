import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.7;

const Drawer = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <View style={styles.drawer}>
      <LinearGradient
        colors={["#0e8d9c", "#074951"]}
        style={styles.drawerContent}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "transparent",
    zIndex: 100,
    borderTopWidth: 1, // Border on the top
    borderRightWidth: 1, // Border on the right
    borderBottomWidth: 1, // Border on the bottom
    borderColor: "#ccc", // Border color
    borderTopRightRadius: 20, // Top right rounded corner
    borderBottomRightRadius: 20, // Bottom right rounded corner
    shadowColor: "#000", // Shadow outside the drawer
    shadowOffset: { width: 5, height: 5 }, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 10, // Shadow blur radius
    elevation: 10, // Elevation for Android
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    borderTopRightRadius: 20, // Top right rounded corner
    borderBottomRightRadius: 20, // Bottom right rounded corner
    color: "#fff",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
});

export default Drawer;
