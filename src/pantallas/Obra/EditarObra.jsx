import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";

import { getCurrentDateTime, fuzeItems } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import {
  entities,
  getEmptyConstructor,
  commonAttrs,
} from "../../Core/util/entities";

import styles from "../styles/Editar.style";

const EditarObra = ({ currentItem, setNewItem }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [propietario, setPropietario] = useState("");

  useEffect(() => {
    const newItem = buildObra(nombre, propietario, direccion);
    const fuzedItem = fuzeItems(newItem, currentItem);
    setNewItem(fuzedItem);
  }, [nombre, propietario, direccion]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Editar Obra</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <Text style={styles.fieldTitle}>Nombre de la obra</Text>
            <TextInput
              placeholder="Nombre de la obra"
              onChangeText={(text) => setNombre(text)}
              style={styles.input}
              defaultValue={currentItem?.[commonAttrs.nombre]}
            />
            <Text style={styles.fieldTitle}>Direccion de la obra</Text>
            <TextInput
              placeholder="Direccion de la obra"
              onChangeText={(text) => setDireccion(text)}
              style={styles.input}
              defaultValue={currentItem?.[commonAttrs.direccion]}
            />
            <Text style={styles.fieldTitle}>Propietario de la obra</Text>
            <TextInput
              placeholder="Propietario de la obra"
              onChangeText={(text) => setPropietario(text)}
              style={styles.input}
              defaultValue={currentItem?.[commonAttrs.propietario]}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default EditarObra;

const buildObra = (nombre = null, propietario = null, direccion = null) => {
  let obra = getEmptyConstructor(entities.obra);

  obra[commonAttrs.fechaEdicion] = getCurrentDateTime();
  obra[commonAttrs.editadoPor] = getLoggedUser().email;

  obra[commonAttrs.nombre] = nombre;
  obra[commonAttrs.propietario] = propietario;
  obra[commonAttrs.direccion] = direccion;

  return obra;
};
