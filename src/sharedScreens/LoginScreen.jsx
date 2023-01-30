import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { setLoggedUser } from "../Core/util/globalStore";
import { userLogin } from "../Core/Firebase/FirebaseAuthManager";
import { queryFSElements } from "../Core/Firebase/FirebaseFirestoreManager";
import { commonAttrs, entities, userTypes } from "../Core/util/entities";
import { createQuery } from "../Core/util/functions";

import SignUpUser from "./User/SignUpUser";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, setRegisterUser] = useState(false);

  const handleLogin = async () => {
    userLogin(email, password, initiateApp);
  };

  const initiateApp = async (user) => {
    let query = createQuery({
      [commonAttrs.email]: user.email,
    });
    const result = await queryFSElements(entities.user, query);

    let newUser = result[0];
    newUser["firebaseData"] = user;
    console.log("Logged user", newUser);

    if (newUser?.[commonAttrs.validated]) {
      setLoggedUser(newUser);
      switch (newUser?.[commonAttrs.userType]) {
        case userTypes.admin:
          navigation.navigate("AdminHomeScreen");
          return;
        case userTypes.contractor:
          navigation.navigate("HomeContratista");
          return;
        case userTypes.architect:
          navigation.navigate("ArqHomeScreen");
          return;
      }
    } else {
      alert("Su usuario aun no se encuentra validado");
      userSignOut(() => {});
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setRegisterUser(true)}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>

      {registerUser && (
        <SignUpUser
          email={email}
          password={password}
          setOpen={setRegisterUser}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
