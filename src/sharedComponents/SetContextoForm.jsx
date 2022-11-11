import { StyleSheet, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";

import DropdownSelect from "./DropdownSelect";
import { palette } from "../assets/colors";

const SetContextoForm = ({ action }) => {
  const [obra, setObra] = useState("");
  const [rubro, setRubro] = useState("");
  const [tarea, setTarea] = useState("");

  useEffect(() => {
    let contexto = {
      obra: obra,
      rubro: rubro,
      tarea: tarea,
    };
    action(contexto);
  }, [obra, rubro, tarea]);

  return (
    <View style={styles.container}>
      <DropdownSelect
        placeholder="Seleccione Obra"
        action={setObra}
        category="obras"
        props={{ stackOrder: 15000 }}
      />
      <DropdownSelect
        placeholder="Seleccione rubro"
        action={setRubro}
        category="rubros"
        props={{ stackOrder: 14000 }}
      />
      <TextInput
        placeholder="Seleccione una Tarea"
        value={tarea}
        onChangeText={(text) => setTarea(text)}
        style={styles.input}
      />
    </View>
  );
};

export default SetContextoForm;

const styles = StyleSheet.create({
  container: {
    zIndex: 100000,
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
