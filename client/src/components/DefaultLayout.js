import React, { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Header from "./Header";
import { useFocusEffect } from "@react-navigation/native";

const DefaultLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Use useFocusEffect to close the drawer when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Reset the drawer state whenever the screen is focused
      setIsDrawerOpen(false);
    }, [])
  );

  return (
    <LinearGradient
      colors={["#074951", "#0e8d9c"]}
      start={{ x: 0.5, y: 0.2 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.linearGradient]}
    >
      <View style={styles.container}>
        <Header onMenuPress={toggleDrawer} isDrawerOpen={isDrawerOpen} />
        <Drawer isOpen={isDrawerOpen}>
          <TouchableOpacity
            onPress={() => setIsDrawerOpen(false)}
            style={[styles.closeButton, { opacity: 0, zIndex: 2000 }]}
          >
            <FontAwesome5 name="reply" size={24} color="white" />
          </TouchableOpacity>
          <DrawerContent />
        </Drawer>

        <View style={styles.content}>{children}</View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 100,
  },
  linearGradient: {
    flex: 1,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
});

export default DefaultLayout;
