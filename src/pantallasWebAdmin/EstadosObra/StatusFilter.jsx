import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DropdownSelect from "../../sharedComponents/DropdownSelect";
import { entities } from "../../Core/util/entities";
import { palette } from "../../Core/colors";

const StatusFilter = ({
  open = true,
  onSearch = () => {},
  onClean = () => {},
}) => {
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
          <View style={localstyles.inputContainer}>
            <TextInput
              placeholder="Dias hacia atrás"
              value={days}
              onChangeText={(text) => setDays(text)}
              style={localstyles.input}
            />
          </View>
          <View style={localstyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                onSearch(obra, days);
              }}
              style={[localstyles.boton, localstyles.botonOK]}
            >
              <Text style={localstyles.botonOkText}>Buscar</Text>
            </TouchableOpacity>
          </View>
          <View style={localstyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => onClean()}
              style={[localstyles.boton, localstyles.botonCancel]}
            >
              <Text style={localstyles.botonCancelText}>Limpiar</Text>
            </TouchableOpacity>
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
  dropDownContainer: { flex: 6, paddingHorizontal: 15 },
  inputContainer: { flex: 6, paddingHorizontal: 15 },
  buttonContainer: { flex: 3, paddingHorizontal: 15 },
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
  botonCancel: {
    backgroundColor: palette.B1,
  },

  botonOkText: {
    color: palette.B1,
    fontWeight: "700",
    fontSize: 16,
  },
  botonCancelText: {
    color: palette.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
export default StatusFilter;
