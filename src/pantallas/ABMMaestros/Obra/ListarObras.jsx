import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";

import { getAllObras } from "../../../Managers/DatosMaestros/ObraManager";

import style from "./ListarObras.style";

const ListarObras = ({ navigation }) => {
  const [obras, setObras] = useState([]);

  const renderObra = ({ item }) => {
    return (
      <View style={style.ListItem}>
        <Text>Nombre obra: {item.Nombre}</Text>
        <Text>Propietario obra: {item.Propietario}</Text>
        <Text>Direccion obra: {item.Direccion}</Text>
        <Text>id: {item.id}</Text>
      </View>
    );
  };

  const obtenerObras = () => {
    const onSuccess = (devolucion) => {
      setObras(devolucion);
    };
    getAllObras(onSuccess);
  };

  useEffect(() => {
    obtenerObras();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <Text style={style.headerText}>Texto cabezera de prueba</Text>
      </View>
      <View style={style.listContainer}>
        <FlatList
          data={obras}
          renderItem={renderObra}
          keyExtractor={(item) => item.id}
          style={style.List}
        />
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={[style.button, style.buttonOutline]}
        >
          <Text style={style.buttonOutlineText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListarObras;
