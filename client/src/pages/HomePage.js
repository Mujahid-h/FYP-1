import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DefaultLayout from "../components/DefaultLayout";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { ImageContext } from "../context/ImageContext";
import Camera from "../../images/camera.png";
import { uploadImagesWithIds } from "../api/imageApi";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
// import axios from "axios";

const HomePage = () => {
  const { selectedImage, setSelectedImage } = useContext(ImageContext);
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo?.data?.id;
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dz0msc6pb/image/upload";

  const CLOUDINARY_UPLOAD_PRESET = "myCloud";

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Toast.show({
        type: "error",
        text1: "Permission Denied",
        text2: "Gallery access is required to select images.",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCameraLaunch = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Toast.show({
        type: "error",
        text1: "Permission Denied",
        text2: "Camera access is required to take photos.",
      });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    // if (!selectedImage) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: "No image selected.",
    //   });
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("file", {
    //   uri: selectedImage,
    //   type: "image/jpeg",
    //   name: "upload.jpg",
    // });
    // formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // try {
    //   const response = await fetch(CLOUDINARY_URL, {
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   // Parse the JSON response
    //   const data = await response.json();

    //   if (response.ok) {
    //     // Upload image URL and user ID to the backend API
    //     const resp = await uploadImagesWithIds(data.secure_url, userId);

    //     Toast.show({
    //       type: "success",
    //       text1: "Success",
    //       text2: "Image uploaded successfully.",
    //     });
    //     setSelectedImage(null);
    //   } else {
    //     console.error("Cloudinary upload failed:", data);
    //     Toast.show({
    //       type: "error",
    //       text1: "Upload Error",
    //       text2: data.error.message || "Failed to upload the image.",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error uploading image:", error);
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: "Failed to upload the image.",
    //   });
    // }

    setSelectedImage(null);

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Image saved successfully!",
    });
  };

  return (
    <DefaultLayout>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingTop: 30,
          paddingBottom: 70,
          alignItems: "center",
        }}
      >
        <View
          style={{
            padding: 30,
            paddingTop: 10,
            borderWidth: 1,
            borderColor: "#fff",
            borderRadius: 20,
            gap: 10,
          }}
        >
          {selectedImage ? (
            <>
              <MaterialIcons
                name="cancel"
                style={{ marginLeft: "auto" }}
                size={24}
                color="red"
                onPress={() => setSelectedImage(null)}
              />
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 200, height: 250, borderRadius: 10 }}
                resizeMode="contain"
              />
            </>
          ) : (
            <Image
              source={Camera}
              style={{ width: 200, height: 250, borderRadius: 10 }}
              resizeMode="contain"
            />
          )}
        </View>

        <View style={{ gap: 20 }}>
          {selectedImage ? (
            <TouchableOpacity style={styles.buttons} onPress={handleUpload}>
              <AntDesign name="download" size={24} color="white" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.buttons}
                onPress={handleCameraLaunch}
              >
                <AntDesign name="camerao" size={24} color="white" />
                <Text style={styles.buttonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={openImagePicker}
              >
                <AntDesign name="upload" size={24} color="white" />
                <Text style={styles.buttonText}>Upload</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "#0a6c76",
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#fff",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default HomePage;
