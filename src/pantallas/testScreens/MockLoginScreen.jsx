import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Globalstyles from "../../assets/globalStyle";

const MockLoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    /*
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.replace("Home")
        }
      })
  
      return unsubscribe*/
  }, []);

  const handleSignUp = () => {
    /*
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Registered with:', user.email);
        })
        .catch(error => alert(error.message))*/
  };

  const handleLogin = () => {
    /*
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
        })
        .catch(error => alert(error.message))*/
  };

  return (
    <KeyboardAvoidingView style={Globalstyles.container} behavior="padding">
      <View style={Globalstyles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={Globalstyles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={Globalstyles.input}
          secureTextEntry
        />
      </View>

      <View style={Globalstyles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={Globalstyles.button}>
          <Text style={Globalstyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[Globalstyles.button, Globalstyles.buttonOutline]}
        >
          <Text style={Globalstyles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MockLoginScreen;
