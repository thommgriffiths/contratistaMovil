import { StyleSheet, TextInput, View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import DropdownSelect from "./DropdownSelect";
import { palette } from "../Core/colors";
import { entities, commonAttrs } from "../Core/util/entities";

const ContextoSet = ({ action, initialValues, isEdit, noTarea }) => {
  const [obra, setObra] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [tarea, setTarea] = useState("");

  useEffect(() => {
    let contexto = {};
    contexto[commonAttrs.tarea] = tarea;
    contexto[entities.obra] = obra;
    contexto[entities.rubro] = rubro;

    action(contexto);
  }, [obra, rubro, tarea]);

  return (
    <View style={styles.container}>
      {isEdit && <Text style={styles.fieldTitle}>Seleccione Obra</Text>}
      <View style={{ zIndex: 10100 }}>
        <DropdownSelect
          placeholder={
            isEdit && initialValues
              ? initialValues[entities.obra]?.Nombre
              : "Seleccione Obra"
          }
          action={setObra}
          category={entities.obra}
          props={{ stackOrder: 15000 }}
          initialValue={initialValues?.obra}
        />
      </View>
      {isEdit && <Text style={styles.fieldTitle}>Seleccione rubro</Text>}
      <View style={{ zIndex: 10090 }}>
        <DropdownSelect
          placeholder={
            isEdit && initialValues
              ? initialValues[entities.rubro]?.Nombre
              : "Seleccione Rubro"
          }
          action={setRubro}
          category={entities.rubro}
          props={{ stackOrder: 14000 }}
          initialValue={initialValues?.rubro}
        />
      </View>
      {isEdit && !noTarea && (
        <View style={{ zIndex: 10080 }}>
          <Text style={styles.fieldTitle}>Tarea Afectada</Text>
          <TextInput
            placeholder={initialValues?.tarea}
            defaultValue={tarea}
            onChangeText={(text) => setTarea(text)}
            style={styles.input}
          />
        </View>
      )}
      {!isEdit && !noTarea && (
        <View style={{ zIndex: 10080 }}>
          <TextInput
            placeholder="Tarea Afectada"
            value={tarea}
            onChangeText={(text) => setTarea(text)}
            style={styles.input}
          />
        </View>
      )}
    </View>
  );
};

export default ContextoSet;

const styles = StyleSheet.create({
  container: {
    //zIndex: 100000,
  },

  fieldTitle: {
    marginTop: 10,
  },

  input: {
    backgroundColor: palette.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: palette.B1,
  },
});
