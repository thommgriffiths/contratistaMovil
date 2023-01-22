import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import Header from "../../../sharedComponents/Header";
import Botones from "../../../sharedComponents/Botones";

import { getCurrentDateTime } from "../../../Core/util/functions";
import { getLoggedUser } from "../../../Core/util/globalStore";
import {
  entities,
  getEmptyConstructor,
  commonAttrs,
} from "../../../Core/util/entities";
import { createFSElementAsync } from "../../../Core/Firebase/FirebaseFirestoreManager";

import styles from "../../styles/Crear.style";

const AdminCrearObra = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [propietario, setPropietario] = useState("");

  const handleCrearObra = async () => {
    let nuevaObra = getEmptyConstructor(entities.obra);

    nuevaObra[commonAttrs.nombre] = nombre;
    nuevaObra[commonAttrs.propietario] = propietario;
    nuevaObra[commonAttrs.direccion] = direccion;
    nuevaObra[commonAttrs.fechaCreacion] = getCurrentDateTime();
    nuevaObra[commonAttrs.creadoPor] = getLoggedUser().Email;

    console.log(nuevaObra);
    await createFSElementAsync(nuevaObra);
    navigation.navigate("AdminVerObrasScreen");
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* form container*/}
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Section title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Crear Obra</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <TextInput
              placeholder="Nombre de la obra"
              value={nombre}
              onChangeText={(text) => setNombre(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Direccion de la obra"
              value={direccion}
              onChangeText={(text) => setDireccion(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Propietario de la obra"
              value={propietario}
              onChangeText={(text) => setPropietario(text)}
              style={styles.input}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <Botones
        onOkFunction={handleCrearObra}
        onOkText={"Crear obra"}
        onCancelFunction={() => navigation.navigate("VerObrasScreen")}
        onCancelText={"Cancelar"}
        style={styles.botonera}
      />
    </View>
  );
};

export default AdminCrearObra;
