import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import { getFSCollectionAsync } from "../../Managers/Firebase/FirebaseFirestoreManager";
import { completeElements } from "../../Core/util/functions";
import { entities } from "../../Core/util/entities";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import DeleteModal from "../../sharedComponents/DeleteModal";
import EditModal from "../../sharedComponents/EditModal";
import DetailModal from "../../sharedComponents/DetailModal";
import style from "./ConsultarPedidosDeObra.style";

const ConsultarPedidosDeObra = () => {
  const [pedidosObra, setPedidosObra] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  //evitar cargar todos los elementos cada vez que realizo alguna accion, deberia hacerlo local
  //para eso el use effect deberia ser un component did mount para que no se actualice cada vez que cambia
  //el estado de modal params, y hacer la accion especifica en cada caso para el use effect de
  //modal params

  useEffect(() => {
    const loadItems = async () => {
      const rawElements = await getFSCollectionAsync(entities.pedidoDeObra);
      const finalElements = await completeElements(rawElements);
      setPedidosObra(finalElements);
      setLoading(false);
    };
    loading ? loadItems() : {};
  }, [loading]);

  useEffect(() => {
    console.log(modalParams);
    if (modalParams["deletedItem"] != undefined) {
      setModalParams({ visible: false });
      setLoading(true);
    }
    if (modalParams["EditedItem"] != undefined) {
      setModalParams({ visible: false });
      setLoading(true);
    }
  }, [modalParams]);

  const renderPedidoObra = ({ item }) => {
    return (
      <View style={style.ListItem}>
        <View style={style.ListItemText}>
          <Pressable
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "showDetail",
                item: item,
              });
            }}
          >
            <Text>Tipo de pedido: {item.TipoDePedido}</Text>
            <Text>id: {item.id}</Text>
            <Text>obra: {item.obraObject?.Nombre}</Text>
            <Text>rubro: {item.rubroObject?.Nombre}</Text>
          </Pressable>
        </View>
        <View style={style.ListItemActions}>
          <Pressable
            style={style.ListItemEdit}
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "Editar",
                item: { ...item, type: entities.pedidoDeObra },
              });
            }}
          />
          <Pressable
            style={style.ListItemDelete}
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "Eliminar",
                item: { ...item, type: entities.pedidoDeObra },
              });
            }}
          />
        </View>
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
      {modalParams?.actionLabel == "Eliminar" && (
        <DeleteModal modalParams={modalParams} setParams={setModalParams} />
      )}
      {modalParams?.actionLabel == "Editar" && (
        <EditModal modalParams={modalParams} setParams={setModalParams} />
      )}
      {modalParams?.actionLabel == "showDetail" && (
        <DetailModal modalParams={modalParams} setParams={setModalParams} />
      )}
    </View>
  );
};

export default ConsultarPedidosDeObra;
