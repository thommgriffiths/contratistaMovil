import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import Header from "../../../sharedComponents/Header";
import Botones from "../../../sharedComponents/Botones";
import { createStylesDatosMaestros } from "../stylesheetMaestros";
import {
  obraConstructor,
  createObra,
} from "../../../Managers/DatosMaestros/ObraManager";

const CrearObra = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [propietario, setPropietario] = useState("");
  const styles = createStylesDatosMaestros();

  const handleCrearObra = () => {
    const nuevaObra = obraConstructor(nombre, direccion, propietario);
    console.log("la obra creada es: ");
    console.log(nuevaObra);

    createObra(nuevaObra, () => navigation.navigate("Home"));
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* cuerpo*/}
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Section title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Crear Obra</Text>
          </View>

          {/*Formulario creacion */}
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
        onOkText={"Crear nueva obra"}
        onCancelFunction={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default CrearObra;
