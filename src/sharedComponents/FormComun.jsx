import { StyleSheet, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";

import { palette } from "../assets/colors";

const FormComun = ({ action }) => {
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
    <View style={styles.formWrapper}>
      <TextInput
        placeholder="Obra"
        value={obra}
        onChangeText={(text) => setObra(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Rubro"
        value={rubro}
        onChangeText={(text) => setRubro(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Tarea"
        value={tarea}
        onChangeText={(text) => setTarea(text)}
        style={styles.input}
      />
    </View>
  );
};

export default FormComun;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.neutral,
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
