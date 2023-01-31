import React, { useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";

import { entities, commonAttrs } from "../../Core/util/entities";
import { getCurrentDateTime } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Editar.style";

const EditarRubro = ({ currentItem, setNewItem }) => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    let newRubro = {};

    if (nombre) newRubro[commonAttrs.nombre] = nombre;

    if (Object.keys(newRubro).length > 0) {
      newRubro[commonAttrs.id] = currentItem[commonAttrs.id];
      newRubro[commonAttrs.type] = entities.rubro;
      newRubro[commonAttrs.fechaEdicion] = getCurrentDateTime();
      newRubro[commonAttrs.editadoPor] = getLoggedUser().Email;
      setNewItem(newRubro);
    }
  }, [nombre]);

  return (
    <View style={styles.container}>
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesText}>Editar Rubro</Text>
      </View>

      <View style={styles.formWrapper}>
        <Text style={styles.fieldTitle}>Nombre del rubro</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={currentItem?.[commonAttrs.nombre]}
            value={nombre}
            onChangeText={(text) => setNombre(text)}
            style={styles.textInput}
            placeholderTextColor="grey"
          />
        </View>
      </View>
    </View>
  );
};

export default EditarRubro;
