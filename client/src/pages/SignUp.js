import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { register } from "../api/authApi";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateMobile = (mobile) => {
    const re = /^[0-9]{11}$/;
    return re.test(mobile);
  };

  const handleSignUp = async () => {
    // if (name === "" || email === "" || mobile === "" || password === "") {
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: "Please fill in all fields",
    //   });
    //   return;
    // }

    // if (!validateEmail(email)) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: "Please enter a valid email address",
    //   });
    //   return;
    // }

    // if (!validateMobile(mobile)) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Invalid Mobile",
    //     text2: "Please enter a valid mobile number",
    //   });
    //   return;
    // }

    // if (password.length < 6) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Invalid Password",
    //     text2: "Password must be at least 6 characters long",
    //   });
    //   return;
    // }

    setIsLoading(true);

    try {
      // const data = await register({
      //   name,
      //   email,
      //   mobile,
      //   password,
      //   encryptionKey: "string",
      //   ivKey: "string",
      // });

      // // If the API call is successful, navigate to login
      // Toast.show({
      //   type: "success",
      //   text1: "Signup Success",
      //   text2: "You have signed up successfully!",
      // });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Signup successfully!",
      });

      navigation.navigate("Login");

      // Clear form fields
      setEmail("");
      setName("");
      setMobile("");
      setPassword("");

      // data.isSuccess && navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Signup Failed",
        text2: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#0D1B2A", "#10E0F0"]}
      style={styles.container}
      start={{ x: 0.5, y: 0.3 }}
      end={{ x: 0.5, y: 1 }}
    >
      <StatusBar style="auto" />
      <Image source={require("../../images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>CryptoCamGuard</Text>
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mobile"
        placeholderTextColor="#aaa"
        style={styles.input}
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={(text) => setMobile(text)}
      />
      <TextInput
        placeholder="New Password"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]} // Disable button when loading
        onPress={() => {
          handleSignUp();
        }}
        disabled={isLoading} // Prevent button press while loading
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Signing Up..." : "Signup"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.AlreadyHaveAnAccount}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Already have an account?</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
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
    backgroundColor: "#D9D9D9",
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
  AlreadyHaveAnAccount: {
    width: "80%",
    marginHorizontal: "auto",
    height: 40,
    backgroundColor: "rgba(13, 27, 42, 0.3)",
    borderRadius: 20,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default SignUp;
