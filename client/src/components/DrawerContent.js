import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { ImageContext } from "../context/ImageContext";
import { useDispatch, useSelector } from "react-redux";
import { setUserinfo } from "../redux/userSlice";

const DrawerContent = () => {
  const navigation = useNavigation();
  const { setSelectedImage } = useContext(ImageContext);
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.user);

  const handleCameraLaunch = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to take photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      navigation.navigate("Home");
    }
  };

  const handleLgout = () => {
    // try {
    //   dispatch(setUserinfo(null));
    // } catch (error) {
    //   error;
    // }
    navigation.navigate("Login");
  };

  return (
    <View style={styles.drawerContent}>
      <View style={styles.header}>
        <Avatar.Image size={44} source={require("../../images/avatar.png")} />
        <View style={styles.userInfo}>
          {/* <Text style={styles.userName}>{userInfo.data.name}</Text>
        <Text style={styles.userLocation}>{userInfo.data.email}</Text> */}

          <Text style={styles.userName}>Sardaar Ali</Text>
          <Text style={styles.userLocation}>sardaar@gmail.com</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Home")}
        >
          <MaterialCommunityIcons name="home-outline" size={20} color="#fff" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleCameraLaunch}>
          <MaterialCommunityIcons
            name="camera-outline"
            size={20}
            color="#fff"
          />
          <Text style={styles.menuText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Gallery")}
        >
          <FontAwesome name="photo" size={20} color="#fff" />
          <Text style={styles.menuText}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("EncryptedImages")}
        >
          <FontAwesome name="file-image-o" size={20} color="#fff" />
          <Text style={styles.menuText}>Encrypted Images</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLgout}>
          <AntDesign name="logout" size={20} color="#fff" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Image source={require("../../images/logo.png")} style={styles.logo} />
        <Text style={styles.footerText}>
          Your Surveillance, Secure and Private.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    paddingLeft: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    paddingBottom: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  userLocation: {
    color: "#fff",
    fontSize: 12,
  },
  menu: {
    flex: 1,
    marginTop: 50,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  footer: {
    alignItems: "center",
    borderTopColor: "#fff",
    paddingTop: 20,
    borderTopWidth: 2,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  footerText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
});

export default DrawerContent;
