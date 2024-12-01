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
// import { encryptImage } from "../api/encryptionApi";
// import Toast from "react-native-toast-message";
// import { useFocusEffect } from "@react-navigation/native";

// const Gallery = () => {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { userInfo } = useSelector((state) => state.user);
//   const userId = userInfo.data.id;
//   const encryptedKey = userInfo.data.encryptionKey;
//   const ivKey = userInfo.data.ivKey;

//   const getImages = async () => {
//     try {
//       const imagesData = await fetchImagesWithIds(userId, false);
//       if (imagesData?.message == "Not Found" || imagesData?.data == null) {
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

//   const handleEncrypted = async (photoId) => {
//     try {
//       await encryptImage({
//         photoId,
//         isEncrypt: true,
//         encryptedKey: "string",
//         ivKey: "string",
//       });
//       Toast.show({
//         type: "success",
//         text1: "Image encrypted successfully!",
//       });
//       await getImages();
//       setImages((prevImages) =>
//         prevImages.filter((imageData) => imageData.photoId !== photoId)
//       );
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         text1: "Error while encrypting",
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
//             .filter((imageData) => imageData.isEncrypted === false)
//             .map((imageData) => (
//               <View key={imageData.id} style={styles.imageContainer}>
//                 <Image
//                   source={{
//                     uri: imageData?.imageLink,
//                   }}
//                   style={styles.image}
//                 />
//                 <View style={styles.imageDetails}>
//                   <Text style={styles.imageId}>Image {imageData.photoId}</Text>
//                   <TouchableOpacity
//                     onPress={() => {
//                       handleEncrypted(imageData?.photoId);
//                     }}
//                   >
//                     <MaterialCommunityIcons
//                       name="shield-lock"
//                       size={24}
//                       color="white"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))
//         ) : (
//           <Text style={styles.noImagesText}>
//             No images to display, Capture or upload one to show images
//           </Text>
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
//     marginBottom: 20,
//     borderWidth: 0.5,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: "#333",
//   },
//   image: {
//     width: 120,
//     height: 160,
//     marginBottom: 10,
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

// export default Gallery;

import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DefaultLayout from "../components/DefaultLayout";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to generate random image data
  const generateRandomImages = () => {
    const randomImages = Array.from({ length: 8 }, (_, index) => ({
      id: index + 1,
      photoId: `photo_${index + 1}`,
      imageLink: `https://picsum.photos/200/300?random=${index + 1}`,
      isEncrypted: false,
    }));
    setImages(randomImages);
    setIsLoading(false);
  };

  useEffect(() => {
    // Simulate API call with random images
    generateRandomImages();
  }, []);

  const handleEncrypted = (photoId) => {
    const updatedImages = images.map((image) =>
      image.photoId === photoId ? { ...image, isEncrypted: true } : image
    );
    setImages(updatedImages);
  };

  if (isLoading) {
    return (
      <DefaultLayout>
        <Text style={styles.loadingText}>Loading...</Text>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {images.length > 0 ? (
          images
            .filter((imageData) => !imageData.isEncrypted)
            .map((imageData) => (
              <View key={imageData.id} style={styles.imageContainer}>
                <Image
                  source={{
                    uri: imageData?.imageLink,
                  }}
                  style={styles.image}
                />
                <View style={styles.imageDetails}>
                  <Text style={styles.imageId}>Image {imageData.photoId}</Text>
                  <TouchableOpacity
                    onPress={() => handleEncrypted(imageData?.photoId)}
                  >
                    <MaterialCommunityIcons
                      name="shield-lock"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
        ) : (
          <Text style={styles.noImagesText}>
            No images to display, Capture or upload one to show images
          </Text>
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
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#333",
  },
  image: {
    width: 120,
    height: 160,
    marginBottom: 10,
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
  loadingText: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  noImagesText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Gallery;
