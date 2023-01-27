import React, { useState } from "react";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";

import {
  entities,
  getEmptyConstructor,
  commonAttrs,
} from "../../../Core/util/entities";
import { createFSElementAsync } from "../../../Core/Firebase/FirebaseFirestoreManager";
import { getCurrentDateTime } from "../../../Core/util/functions";
import { getLoggedUser } from "../../../Core/util/globalStore";
import styles from "../../styles/Crear.style";

import Header from "../../../sharedComponents/Header";
import Botones from "../../../sharedComponents/Botones";

const AdminCrearRubro = ({ navigation }) => {
  const [nombre, setNombre] = useState("");

  const handleCrearRubro = async () => {
    let newRubro = getEmptyConstructor(entities.rubro);

    newRubro[commonAttrs.nombre] = nombre;
    newRubro[commonAttrs.fechaCreacion] = getCurrentDateTime();
    newRubro[commonAttrs.creadoPor] = getLoggedUser().Email;

    await createFSElementAsync(newRubro);
    navigation.navigate("AdminVerRubrosScreen");
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* form container*/}
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Section title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Crear Rubro</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <TextInput
              placeholder="Nombre del rubro"
              value={nombre}
              onChangeText={(text) => setNombre(text)}
              style={styles.input}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttonsWrapper}>
        <Botones
          onOkFunction={handleCrearRubro}
          onOkText={"Crear rubro"}
          onCancelFunction={() => navigation.navigate("AdminVerRubrosScreen")}
          onCancelText={"Cancelar"}
          style={styles.botonera}
        />
      </View>
    </View>
  );
};

export default AdminCrearRubro;
