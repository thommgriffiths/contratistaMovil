import React, { useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";

import { entities, commonAttrs } from "../../Core/util/entities";
import { getCurrentDateTime } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Editar.style";

const EditarObra = ({ currentItem, setNewItem }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [propietario, setPropietario] = useState("");

  useEffect(() => {
    let newObra = {};

    if (nombre) newObra[commonAttrs.nombre] = nombre;
    if (direccion) newObra[commonAttrs.direccion] = direccion;
    if (propietario) newObra[commonAttrs.propietario] = propietario;

    if (Object.keys(newObra).length > 0) {
      newObra[commonAttrs.id] = currentItem[commonAttrs.id];
      newObra[commonAttrs.type] = entities.obra;
      newObra[commonAttrs.fechaEdicion] = getCurrentDateTime();
      newObra[commonAttrs.editadoPor] = getLoggedUser().Email;
      setNewItem(newObra);
    }
  }, [nombre, propietario, direccion]);

  return (
    <View style={styles.container}>
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesText}>Editar Obra</Text>
      </View>

      <View style={styles.formWrapper}>
        <Text style={styles.fieldTitle}>Nombre de la obra</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={currentItem?.[commonAttrs.nombre]}
            value={nombre}
            onChangeText={(text) => {
              setNombre(text);
            }}
            style={styles.textInput}
            placeholderTextColor="grey"
          />
        </View>

        <Text style={styles.fieldTitle}>Direccion de la obra</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={currentItem?.[commonAttrs.direccion]}
            value={direccion}
            onChangeText={(text) => {
              setDireccion(text);
            }}
            style={styles.textInput}
            placeholderTextColor="grey"
          />
        </View>

        <Text style={styles.fieldTitle}>Propietario de la obra</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={currentItem?.[commonAttrs.propietario]}
            value={propietario}
            onChangeText={(text) => {
              setPropietario(text);
            }}
            style={styles.textInput}
            placeholderTextColor="grey"
          />
        </View>
      </View>
    </View>
  );
};

export default EditarObra;
