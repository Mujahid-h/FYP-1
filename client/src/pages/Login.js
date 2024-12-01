import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { login } from "../api/authApi";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { setUserinfo } from "../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleCreateAccount = () => {
    navigation.navigate("Signup");
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    // if (email === "" || password === "") {
    //   Toast.show({
    //     type: "error",
    //     text1: "Login Failed",
    //     text2: "Please fill in all fields.",
    //   });
    //   return;
    // }

    // if (!validateEmail(email)) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Login Failed",
    //     text2: "Please enter a valid email address",
    //   });
    //   return;
    // }

    setIsLoading(true);

    try {
      // const data = await login({ email, password });

      // // if (data.isSuccess) {
      // await dispatch(setUserinfo(data));
      // // console.log(data.data);
      navigation.navigate("Home");
      setEmail("");
      setPassword("");
      Toast.show({
        type: "success",
        text1: "Login Success",
        text2: "You have successfully signin",
      });
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={["#0D1B2A", "#10E0F0"]}
      start={{ x: 0.5, y: 0.3 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image source={require("../../images/logo.png")} style={styles.logo} />
        <Text style={styles.title}>CryptoCamGuard</Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]} // Disable button when loading
          onPress={handleSubmit}
          disabled={isLoading} // Prevent button press while loading
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Logging In..." : "Login"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    color: "black",
    marginHorizontal: "auto",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    marginHorizontal: "auto",
    height: 40,
    backgroundColor: "#0d1b2a",
    borderRadius: 20,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#555", // Change color when loading
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createAccountButton: {
    width: "80%",
    marginHorizontal: "auto",
    height: 40,
    backgroundColor: "#0d1b2a",
    borderRadius: 20,
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#fff",
    marginBottom: 20,
    marginTop: 20,
  },
});

export default Login;
