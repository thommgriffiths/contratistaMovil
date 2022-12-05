import { StyleSheet, TextInput, View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import DropdownSelect from "./DropdownSelect";
import { palette } from "../Core/colors";
import { entities, commonAttrs } from "../Core/util/entities";

const ContextoFilter = ({ action }) => {
  const [obra, setObra] = useState([]);
  const [rubro, setRubro] = useState([]);

  useEffect(() => {
    let contexto = {};
    contexto[entities.obra] = obra;
    contexto[entities.rubro] = rubro;
    //console.log(contexto);
    action(contexto);
  }, [obra, rubro]);

  return (
    <View style={styles.container}>
      <DropdownSelect
        placeholder="Seleccione Obras"
        multiple
        action={setObra}
        category={entities.obra}
        props={{ stackOrder: 15000 }}
      />
      <DropdownSelect
        placeholder="Seleccione rubros"
        multiple
        action={setRubro}
        category={entities.rubro}
        props={{ stackOrder: 14000 }}
      />
    </View>
  );
};

export default ContextoFilter;

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
