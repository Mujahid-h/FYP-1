// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import { fetchImagesWithIds } from "../api/imageApi";
// import DefaultLayout from "../components/DefaultLayout";
// import { useSelector } from "react-redux";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { encryptImage } from "../api/encryptionApi";
// import Toast from "react-native-toast-message";
// import { useFocusEffect } from "@react-navigation/native";

// const EncryptedImages = () => {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { userInfo } = useSelector((state) => state.user);
//   const [showImageState, setShowImageState] = useState({});
//   const userId = userInfo.data.id;
//   const encryptedKey = userInfo.data.encryptionKey;
//   const ivKey = userInfo.data.ivKey;

//   // Fetch images
//   const getImages = async () => {
//     try {
//       const imagesData = await fetchImagesWithIds(userId, true);
//       if (imagesData?.message === "Not Found" || imagesData?.data == null) {
//         setIsLoading(false);
//       } else {
//         setImages(imagesData?.data);
//         setIsLoading(false);
//       }
//     } catch (err) {
//       setError("Failed to load image.");
//       setIsLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       getImages();
//     }, [])
//   );

//   const toggleShowImage = (photoId) => {
//     setShowImageState((prevState) => ({
//       ...prevState,
//       [photoId]: !prevState[photoId],
//     }));
//   };

//   const handleDecrypt = async (photoId) => {
//     try {
//       await encryptImage({
//         photoId,
//         isEncrypt: false,
//         encryptedKey: "string",
//         ivKey: "string",
//       });
//       Toast.show({
//         type: "success",
//         text1: "Image decrypted successfully!",
//       });

//       getImages(); // Re-fetch images after encryption

//       setImages((prevImages) =>
//         prevImages.filter((imageData) => imageData.photoId !== photoId)
//       );
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         text1: "Error while decrypting",
//       });
//     }
//   };

//   if (isLoading) {
//     return (
//       <DefaultLayout>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </DefaultLayout>
//     );
//   }

//   if (error) {
//     return (
//       <DefaultLayout>
//         <Text style={styles.errorText}>{error}</Text>
//       </DefaultLayout>
//     );
//   }

//   return (
//     <DefaultLayout>
//       <ScrollView contentContainerStyle={styles.container}>
//         {images.length > 0 ? (
//           images
//             .filter((imageData) => imageData.isEncrypted === true)
//             .map((imageData) => (
//               <View key={imageData.id} style={styles.imageContainer}>
//                 {!showImageState[imageData.photoId] ? (
//                   <>
//                     <FontAwesome
//                       name="eye"
//                       size={64}
//                       color="white"
//                       onPress={() => toggleShowImage(imageData.photoId)}
//                     />
//                     <Text style={styles.imageId}>
//                       Image {imageData.photoId}
//                     </Text>
//                   </>
//                 ) : (
//                   <>
//                     <Image
//                       source={{
//                         uri: imageData?.imageLink,
//                       }}
//                       style={styles.image}
//                     />
//                     <View style={styles.imageDetails}>
//                       <FontAwesome
//                         name="eye-slash"
//                         size={24}
//                         color="white"
//                         onPress={() => toggleShowImage(imageData.photoId)}
//                       />

//                       <TouchableOpacity
//                         onPress={() => handleDecrypt(imageData?.photoId)}
//                       >
//                         <MaterialCommunityIcons
//                           name="shield-lock-open"
//                           size={24}
//                           color="white"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </>
//                 )}
//               </View>
//             ))
//         ) : (
//           <Text style={styles.noImagesText}>No Encrypted images yet</Text>
//         )}
//       </ScrollView>
//     </DefaultLayout>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     padding: 10,
//   },
//   imageContainer: {
//     alignItems: "center",
//     justifyContent: "center", // Ensures content is centered
//     marginBottom: 20,
//     borderWidth: 0.5,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: "#333",
//     width: 150, // Fixed width for the container
//     height: 200, // Fixed height for the container
//   },
//   image: {
//     width: 120,
//     height: 160,
//     resizeMode: "contain",
//     borderRadius: 4,
//   },
//   imageDetails: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: 140,
//   },
//   imageId: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   loadingText: {
//     fontSize: 20,
//     color: "#000",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   errorText: {
//     fontSize: 18,
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   noImagesText: {
//     fontSize: 18,
//     color: "#fff",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default EncryptedImages;

import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DefaultLayout from "../components/DefaultLayout";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";

const EncryptedImages = () => {
  const [showImageState, setShowImageState] = useState({});

  // Dummy data for random images
  const dummyImages = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    photoId: index + 1,
    imageLink: `https://via.placeholder.com/150?text=Image+${index + 1}`,
    isEncrypted: true,
  }));

  const toggleShowImage = (photoId) => {
    setShowImageState((prevState) => ({
      ...prevState,
      [photoId]: !prevState[photoId],
    }));
  };

  const handleDecrypt = (photoId) => {
    Toast.show({
      type: "success",
      text1: `Image ${photoId} decrypted successfully!`,
    });
  };

  return (
    <DefaultLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {dummyImages.length > 0 ? (
          dummyImages.map((imageData) => (
            <View key={imageData.id} style={styles.imageContainer}>
              {!showImageState[imageData.photoId] ? (
                <>
                  <FontAwesome
                    name="eye"
                    size={64}
                    color="white"
                    onPress={() => toggleShowImage(imageData.photoId)}
                  />
                  <Text style={styles.imageId}>Image {imageData.photoId}</Text>
                </>
              ) : (
                <>
                  <Image
                    source={{
                      uri: imageData.imageLink,
                    }}
                    style={styles.image}
                  />
                  <View style={styles.imageDetails}>
                    <FontAwesome
                      name="eye-slash"
                      size={24}
                      color="white"
                      onPress={() => toggleShowImage(imageData.photoId)}
                    />
                    <TouchableOpacity
                      onPress={() => handleDecrypt(imageData.photoId)}
                    >
                      <MaterialCommunityIcons
                        name="shield-lock-open"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noImagesText}>No Encrypted images yet</Text>
        )}
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#333",
    width: 150,
    height: 200,
  },
  image: {
    width: 120,
    height: 160,
    resizeMode: "contain",
    borderRadius: 4,
  },
  imageDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 140,
  },
  imageId: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  noImagesText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});

export default EncryptedImages;
