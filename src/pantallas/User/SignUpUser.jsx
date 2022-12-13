import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  entities,
  getEmptyConstructor,
  commonAttrs,
} from "../../Core/util/entities";
import { userSignUpAsync } from "../../Core/Firebase/FirebaseAuthManager";
import { createFSElementAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import { setLoggedUser } from "../../Core/util/globalStore";
import LoadingComponent from "../../sharedComponents/LoadingComponent";
import Botones from "../../sharedComponents/Botones";

import styles from "../styles/Crear.style";

const SignUpUser = ({ email, password, setOpen }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleCrearUsuario = async () => {
    if (passwordConfirm != password) return;
    setLoading(true);

    const FBuser = await userSignUpAsync(email, password);

    let newUser = getEmptyConstructor(entities.user);

    newUser[commonAttrs.nombre] = nombre;
    newUser[commonAttrs.apellido] = apellido;
    newUser[commonAttrs.email] = email;
    newUser[commonAttrs.firebaseID] = FBuser.uid;

    console.log(newUser);

    await createFSElementAsync(newUser);
    setLoggedUser(newUser);

    navigation.replace("Home");
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
      <View style={modalStyle.centeredView}>
        <View style={modalStyle.modalView}>
          <View style={styles.body}>
            {!loading && (
              <KeyboardAvoidingView behavior="height">
                {/*Section title*/}
                <View style={styles.detailTitlesWrapper}>
                  <Text style={styles.detailTitlesTitle}>Registrarse</Text>
                </View>

                {/*Form */}
                <View style={styles.formWrapper}>
                  <TextInput
                    placeholder="Ingrese su nombre"
                    value={nombre}
                    onChangeText={(text) => setNombre(text)}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Ingrese su apellido"
                    value={apellido}
                    onChangeText={(text) => setApellido(text)}
                    style={styles.input}
                  />
                </View>
                <TextInput
                  placeholder="Reingrese su nueva contraseña"
                  value={passwordConfirm}
                  onChangeText={(text) => setPasswordConfirm(text)}
                  style={styles.input}
                  secureTextEntry
                />
              </KeyboardAvoidingView>
            )}
            {loading && <LoadingComponent />}
          </View>

          <Botones
            onOkFunction={handleCrearUsuario}
            onOkText={"Registrarse"}
            onCancelFunction={() => setOpen(false)}
            onCancelText={"Cancelar"}
            style={styles.botonera}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SignUpUser;

const modalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
