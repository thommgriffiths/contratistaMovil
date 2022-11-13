import { Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import { getAllPedidosObraAsync } from "../../Managers/EntidadesFinales/PedidoObraManager";
import { completeElements } from "../../Core/util/functions";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import style from "./VerPedidosObra.style";

const VerPedidosObra = () => {
  const [pedidosObra, setPedidosObra] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const rawElements = await getAllPedidosObraAsync();
    const finalElements = await completeElements(rawElements);
    setPedidosObra(finalElements);
    setLoading(false);
  }, []);

  const renderPedidoObra = ({ item }) => {
    return (
      <View style={style.ListItem}>
        <Text>Tipo de pedido: {item.TipoDePedido}</Text>
        <Text>id: {item.id}</Text>
        <Text>obra: {item.obraObject?.Nombre}</Text>
        <Text>rubro: {item.rubroObject?.Nombre}</Text>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <Header backButton />
      <View style={style.body}>
        <Titles titleText="Ver pedidos de obra" />
        <View style={style.listContainer}>
          {loading && <Text>Loading</Text>}
          <FlatList
            data={pedidosObra}
            renderItem={renderPedidoObra}
            keyExtractor={(item) => item.id}
            style={style.List}
          />
        </View>
      </View>
    </View>
  );
};

export default VerPedidosObra;
