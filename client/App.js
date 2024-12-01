// import React, { useState } from "react";
// import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
// import Drawer from "./src/components/Drawer";
// import DrawerContent from "./src/components/DrawerContent";
// import Toast from "react-native-toast-message";
// import AppNavigator from "./AppNavigator";
// import HomePage from "./src/pages/HomePage";
// import { Provider } from "react-redux";
// import store from "./src/redux/store";

// const App = () => {
//   return (
//     <Provider store={store}>
//       <SafeAreaView style={styles.safeContainer}>
//         <View style={[styles.content]}>
//           <AppNavigator />
//         </View>

//         <Toast />
//       </SafeAreaView>
//     </Provider>
//   );
// };

// const styles = StyleSheet.create({
//   safeContainer: {
//     flex: 1,
//   },

//   content: {
//     flex: 1,
//   },
// });

// export default App;

import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { ImageProvider } from "./src/context/ImageContext"; // Ensure this import is correct

const App = () => {
  return (
    <Provider store={store}>
      <ImageProvider>
        <SafeAreaView style={styles.safeContainer}>
          <View style={[styles.content]}>
            <AppNavigator />
          </View>
          <Toast />
        </SafeAreaView>
      </ImageProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;
