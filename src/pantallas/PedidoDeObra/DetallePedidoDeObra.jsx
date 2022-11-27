import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";

import { label } from "../../Core/util/labels";
import { palette } from "../../assets/colors";

const properties = ["Status", "User", "Descripcion", "obra", "rubro"];

const DetallePedidoDeObra = ({ item }) => {
  const [itemProperties, setItemProperties] = useState([]);

  useEffect(() => {
    const formatedProperties = formatProperties(item, properties);
    console.log(formatedProperties);
    setItemProperties(formatedProperties);
  }, []);

  return (
    <View style={styles.component}>
      <FlatList
        data={itemProperties}
        renderItem={displayProperty}
        keyExtractor={(item) => item.ID}
        style={styles.List}
      />
    </View>
  );
};

export default DetallePedidoDeObra;

const formatProperties = (item = {}, properties = []) => {
  let result = [];
  properties.forEach((ID) => {
    item[ID] ? result.push({ ID: ID, value: item[ID] }) : null;
  });

  return result;
};

const displayProperty = ({ item }) => {
  console.log("displaying item...");
  console.log(item);
  return (
    <View style={styles.propertyContainer}>
      <Text style={styles.label}>{label(item.ID)}</Text>
      <Text style={styles.content}>{item.value}</Text>
      <View style={styles.separator}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    marginBottom: 10,
  },
  propertyContainer: {
    //marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  content: {},
  separator: {
    backgroundColor: palette.B2,
    height: 1,
    marginVertical: 3,
  },
  List: {},
});

/*
todas las propiedades del objeto pedido de obra:
id
User
Fecha
Status
type
rubro
obra
Descripcion
TipoDePedido
rubroObject
obraObject*/
