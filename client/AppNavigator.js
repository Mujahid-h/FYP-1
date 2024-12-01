import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Slider from "./src/pages/Slider";
import HomePage from "./src/pages/HomePage";
import EncryptedImages from "./src/pages/EncryptedImages";
import Gallery from "./src/pages/Gallery";
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Slider">
        <Stack.Screen
          name="Slider"
          component={Slider}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EncryptedImages"
          component={EncryptedImages}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
