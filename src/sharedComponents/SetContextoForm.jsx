import { StyleSheet, TextInput, View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import DropdownSelect from "./DropdownSelect";
import { palette } from "../assets/colors";
import { entities } from "../Core/types";

const SetContextoForm = ({ action, initialValues, isEdit }) => {
  const [obra, setObra] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [tarea, setTarea] = useState(null);

  useEffect(() => {
    let contexto = {
      tarea: tarea,
    };
    contexto[entities.obra] = obra;
    contexto[entities.rubro] = rubro;
    action(contexto);
  }, [obra, rubro, tarea]);

  return (
    <View style={styles.container}>
      {isEdit && <Text style={styles.fieldTitle}>Seleccione Obra</Text>}
      <DropdownSelect
        placeholder={
          isEdit && initialValues
            ? initialValues[entities.obra + "Object"]["Nombre"]
            : "Seleccione Obra"
        }
        action={setObra}
        category="obras"
        props={{ stackOrder: 15000 }}
        initialValue={initialValues?.obra}
      />
      {isEdit && <Text style={styles.fieldTitle}>Seleccione rubro</Text>}
      <DropdownSelect
        placeholder={
          isEdit && initialValues
            ? initialValues[entities.rubro + "Object"]["Nombre"]
            : "Seleccione rubro"
        }
        action={setRubro}
        category="rubros"
        props={{ stackOrder: 14000 }}
        initialValue={initialValues?.rubro}
      />
      {isEdit ? (
        <>
          <Text style={styles.fieldTitle}>Seleccione una tarea</Text>
          <TextInput
            placeholder="Seleccione una Tarea"
            //Agregar aca para busque en objeto
            defaultValue={tarea}
            onChangeText={(text) => setTarea(text)}
            style={styles.input}
          />
        </>
      ) : (
        <TextInput
          placeholder="Seleccione una Tarea"
          value={tarea}
          onChangeText={(text) => setTarea(text)}
          style={styles.input}
        />
      )}
    </View>
  );
};

export default SetContextoForm;

const styles = StyleSheet.create({
  container: {
    zIndex: 100000,
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
