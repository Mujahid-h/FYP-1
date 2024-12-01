import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Header = ({ onMenuPress, isDrawerOpen }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onMenuPress}
        style={styles.menuButton}
        disabled={isDrawerOpen}
      >
        {!isDrawerOpen && <Feather name="menu" size={28} color="#fff" />}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onMenuPress}
        style={[styles.menuButton, { paddingLeft: 100 }]}
        disabled={!isDrawerOpen}
      >
        {isDrawerOpen && <FontAwesome5 name="reply" size={24} color="white" />}
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require("../../images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>CryptoCamGuard</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    paddingHorizontal: 10,
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 2000,
  },
  menuButton: {
    padding: 8,
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  appName: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "600",
  },
});

export default Header;
