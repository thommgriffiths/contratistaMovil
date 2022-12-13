import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";

import { label } from "../../Core/util/labels";
import { formatToDisplay } from "../../Core/util/functions";
import styles from "../styles/Detalle.style";

const propertiesToDisplay = [
  "Status",
  "User",
  "Descripcion",
  "obra",
  "rubro",
  "Monto",
  "FechaCreacion",
];

const DetallePedidoDeReintegro = ({ item }) => {
  const [itemProperties, setItemProperties] = useState([]);

  useEffect(() => {
    const formatedProperties = formatToDisplay(item, propertiesToDisplay);
    console.log(formatedProperties);
    setItemProperties(formatedProperties);
  }, []);

  const displayProperty = ({ item }) => {
    return (
      <View style={styles.propertyContainer}>
        <Text style={styles.label}>{label(item.key)}</Text>
        <Text style={styles.content}>{item.value}</Text>
        <View style={styles.separator}></View>
      </View>
    );
  };

  return (
    <View style={styles.component}>
      <FlatList
        data={itemProperties}
        renderItem={displayProperty}
        keyExtractor={(item) => item.key}
        style={styles.List}
      />
    </View>
  );
};

export default DetallePedidoDeReintegro;
