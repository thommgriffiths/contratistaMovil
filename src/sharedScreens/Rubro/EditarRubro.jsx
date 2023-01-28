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

const EditarRubro = ({ currentItem, setNewItem }) => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const newItem = buildRubro(nombre);
    const fuzedItem = fuzeItems(newItem, currentItem);
    setNewItem(fuzedItem);
  }, [nombre]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Editar Rubro</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <Text style={styles.fieldTitle}>Nombre del rubro</Text>
            <TextInput
              placeholder="Nombre del rubro"
              onChangeText={(text) => setNombre(text)}
              style={styles.input}
              defaultValue={currentItem?.[commonAttrs.nombre]}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default EditarRubro;

const buildRubro = (nombre = null) => {
  let rubro = getEmptyConstructor(entities.rubro);

  rubro[commonAttrs.fechaEdicion] = getCurrentDateTime();
  rubro[commonAttrs.editadoPor] = getLoggedUser().Email;

  rubro[commonAttrs.nombre] = nombre;
  return rubro;
};
