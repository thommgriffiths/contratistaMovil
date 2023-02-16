import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  entities,
  getEmptyConstructor,
  commonAttrs,
  userTypes,
} from "../../Core/util/entities";
import { userSignUpAsync } from "../../Core/Firebase/FirebaseAuthManager";
import { createFSElementAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import styles from "../styles/SignUp.style";

import LoadingComponent from "../../sharedComponents/LoadingComponent";
import DropDownSelectMobile from "../../sharedComponents/DropDownSelectMobile";
import Botones from "../../sharedComponents/Botones";

const SignUpUser = ({ email, password, setOpen }) => {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userType, setUserType] = useState("");

  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const handleCrearUsuario = async () => {
    if (passwordConfirm != password) {
      alert("Las contraseñas no coinciden. Verifique");
      return;
    }
    setLoading(true);

    const FBuser = await userSignUpAsync(email, password);

    let newUser = getEmptyConstructor(entities.user);
    newUser[commonAttrs.nombre] = nombre;
    newUser[commonAttrs.apellido] = apellido;
    newUser[commonAttrs.email] = email;
    newUser[commonAttrs.userType] = userTypes[userType];
    newUser[commonAttrs.validated] = false;
    newUser[commonAttrs.firebaseID] = FBuser.uid;

    console.log(newUser);
    await createFSElementAsync(newUser);

    setCreated(true);
    setLoading(false);
  };

  const ConfirmationMessage = () => {
    return (
      <View>
        <Text style={styles.text}>Su usuario a sido creado con éxito.</Text>
        <Text style={styles.text}>Aguarde validacion del administrador.</Text>
        <Pressable
          onPress={() => navigation.replace("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>OK</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView
            style={styles.scrolllView}
            contentContainerStyle={styles.scrolllViewContentContainer}
          >
            {loading && !created && <LoadingComponent />}
            {!loading && created && <ConfirmationMessage />}

            {!(loading || created) && (
              <View style={styles.body}>
                <View style={styles.titlesWrapper}>
                  <Text style={styles.titlesText}>Registrarse</Text>
                </View>

                <View style={styles.formWrapper}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="Ingrese su nombre"
                      value={nombre}
                      onChangeText={(text) => setNombre(text)}
                      style={styles.textInput}
                      placeholderTextColor="grey"
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="Ingrese su apellido"
                      value={apellido}
                      onChangeText={(text) => setApellido(text)}
                      style={styles.textInput}
                      placeholderTextColor="grey"
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="Reingrese su nueva contraseña"
                      value={passwordConfirm}
                      onChangeText={(text) => setPasswordConfirm(text)}
                      secureTextEntry
                      style={styles.textInput}
                      placeholderTextColor="grey"
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <DropDownSelectMobile
                      options={userTypes}
                      placeholder="Seleccione su tipo de usuario"
                      set={(value) => setUserType(value)}
                    />
                  </View>

                  <View style={styles.buttonsWrapper}>
                    <Botones
                      onOkFunction={handleCrearUsuario}
                      onOkText={"Registrarse"}
                      onCancelFunction={() => setOpen(false)}
                      onCancelText={"Cancelar"}
                    />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SignUpUser;
