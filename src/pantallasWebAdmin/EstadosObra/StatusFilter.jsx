import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

import { entities } from "../../Core/util/entities";
import { palette } from "../../Core/colors";

import DropdownSelect from "../../sharedComponents/DropdownSelect";

const StatusFilter = ({ open = true, onSearch = () => {} }) => {
  const [days, setDays] = useState("");
  const [obra, setObra] = useState(0);

  return (
    open && (
      <>
        <View style={localstyles.filterContainer}>
          <View style={localstyles.dropDownContainer}>
            <DropdownSelect
              placeholder="Seleccione Obra"
              action={setObra}
              category={entities.obra}
              props={{ stackOrder: 15000 }}
            />
          </View>
          <View style={localstyles.separator}></View>
          <View style={localstyles.inputContainer}>
            <TextInput
              placeholder="Dias hacia atrás"
              value={days}
              onChangeText={(text) => {
                if (+text || text == "") setDays(text);
                else {
                  setDays("");
                  alert("Solo se permiten números");
                }
              }}
              style={localstyles.input}
            />
          </View>
          <View style={localstyles.separator}></View>
          <View style={localstyles.buttonContainer}>
            <Pressable
              onPress={() => {
                onSearch(obra, days);
              }}
              style={[localstyles.boton, localstyles.botonOK]}
            >
              <Text style={localstyles.botonOkText}>Buscar</Text>
            </Pressable>
          </View>
        </View>
      </>
    )
  );
};

const localstyles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },
  dropDownContainer: { flex: 2 },
  inputContainer: { flex: 2 },
  buttonContainer: { flex: 1 },
  separator: { width: 25 },
  input: {
    backgroundColor: palette.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: palette.B1,
    height: "100%",
  },
  boton: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: palette.B1,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  botonOK: {
    backgroundColor: palette.white,
  },
  botonOkText: {
    color: palette.B1,
    fontWeight: "700",
    fontSize: 16,
  },
});
export default StatusFilter;
