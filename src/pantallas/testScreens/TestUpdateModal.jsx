import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Globalstyles from "../../assets/globalStyle";
import {
  newObra,
  createObra,
  obraConstructor,
  updateObra,
} from "../../Managers/ObraManager";

const TestUpdateModal = (props) => {
  const navigation = useNavigation();

  //Hooks
  const [idObra, setIdObra] = useState(props.id);
  const [nombreObra, setNombreObra] = useState(props.Nombre);
  const [propietarioObra, setPropietarioObra] = useState(props.Propietario);
  const [direccionObra, setDireccionObra] = useState(props.Direccion);

  const onSuccess = () => {};

  const actualizarObra = () => {
    //validar que este todo lleno

    let newObra = obraConstructor(nombreObra, direccionObra, propietarioObra);
    updateObra(idObra, newObra, onSuccess);
  };

  return (
    <KeyboardAvoidingView style={Globalstyles.container} behavior="height">
      <View style={Globalstyles.inputContainer}>
        <TextInput
          placeholder="Nombre Nueva Obra"
          value={nombreObra}
          onChangeText={(text) => setNombreObra(text)}
          style={Globalstyles.input}
        />
        <TextInput
          placeholder="Propietario Obra"
          value={propietarioObra}
          onChangeText={(text) => setPropietarioObra(text)}
          style={Globalstyles.input}
        />
        <TextInput
          placeholder="Direccion Obra"
          value={direccionObra}
          onChangeText={(text) => setDireccionObra(text)}
          style={Globalstyles.input}
        />
      </View>

      <View style={Globalstyles.buttonContainer}>
        <TouchableOpacity onPress={actualizarObra} style={Globalstyles.button}>
          <Text style={Globalstyles.buttonText}>Actualizar Obra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSuccess}
          style={[Globalstyles.button, Globalstyles.buttonOutline]}
        >
          <Text style={Globalstyles.buttonOutlineText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TestUpdateModal;
