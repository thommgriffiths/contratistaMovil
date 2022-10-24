import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";

import Globalstyles from "../../assets/globalStyle";
import {
  newObra,
  createObra,
  obraConstructor,
  getAllObras,
  deleteObra,
} from "../Managers/DatosMaestros/ObraManager";

const TestObrasWithDelete = ({ navigation }) => {
  const [obras, setObras] = useState([]);

  const renderObra = ({ item }) => {
    return (
      <View style={[Globalstyles.ListItem, { flexDirection: "row" }]}>
        <View>
          <Text>Nombre obra: {item.Nombre}</Text>
          <Text>Propietario obra: {item.Propietario}</Text>
          <Text>Direccion obra: {item.Direccion}</Text>
          <Text>id: {item.id}</Text>
        </View>
        <TouchableOpacity
          style={Globalstyles.ListItemDelete}
          onPress={() => {
            handleDelete(item.id);
          }}
        >
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  const obtenerObras = () => {
    const onSuccess = (devolucion) => {
      setObras(devolucion);
    };
    getAllObras(onSuccess);
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteObra(id, obtenerObras);
  };

  useEffect(() => {
    obtenerObras();
  }, []);

  return (
    <SafeAreaView style={Globalstyles.container}>
      <FlatList
        data={obras}
        renderItem={renderObra}
        keyExtractor={(item) => item.id}
        style={Globalstyles.List}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={[Globalstyles.button, Globalstyles.buttonOutline]}
      >
        <Text style={Globalstyles.buttonOutlineText}>Volver</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TestObrasWithDelete;
