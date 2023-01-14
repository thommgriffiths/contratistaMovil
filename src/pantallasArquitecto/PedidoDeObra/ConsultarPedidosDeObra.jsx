import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { getFSCollectionAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import {
  completeElements,
  fechaComun,
  sortElementsByCommonAttribute,
} from "../../Core/util/functions";
import { commonAttrs, entities } from "../../Core/util/entities";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import DeleteModal from "../../sharedComponents/DeleteModal";
import EditModal from "../../sharedComponents/EditModal";
import DetailModal from "../../sharedComponents/DetailModal";
import FilterModal from "../../sharedComponents/FilterModal";
import LoadingComponent from "../../sharedComponents/LoadingComponent";
import styles from "../styles/Consultar.style";
import { label } from "../../Core/util/labels";

const ArqConsultarPedidosDeObra = ({ navigation }) => {
  const [pedidosObra, setPedidosObra] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  useEffect(() => {
    const loadItems = async () => {
      const rawElements = await getFSCollectionAsync(entities.pedidoDeObra);
      const completedElements = await completeElements(rawElements);
      console.log(completedElements);

      const sortedElements = sortElementsByCommonAttribute(
        completedElements,
        commonAttrs.fechaCreacion,
        false
      );

      setPedidosObra(sortedElements);
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
    if (modalParams["editedItem"] != undefined) {
      setModalParams({ visible: false });
      setLoading(true);
    }
  }, [modalParams]);

  const renderPedidoObra = ({ item }) => {
    return (
      <View style={styles.ListItem}>
        <View style={styles.ListItemText}>
          <Pressable
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "showDetail",
                item: item,
              });
            }}
          >
            <ShortInfo item={item} />
          </Pressable>
        </View>
        <View style={styles.ListItemActions}>
          <Pressable
            style={styles.ListItemEdit}
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "Editar",
                item: item,
              });
            }}
          >
            <AntDesign name="edit" size={24} color="black" />
          </Pressable>
          <Pressable
            style={styles.ListItemDelete}
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "Eliminar",
                item: item,
              });
            }}
          >
            <AntDesign name="delete" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header backTo="ArqHomeScreen" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Pedidos de obra" />
          <View style={styles.actions}>
            <Pressable
              style={styles.actionsFilter}
              onPress={() => {
                setModalParams({
                  visible: true,
                  actionLabel: "Filter",
                  item: { [commonAttrs.type]: entities.pedidoDeObra },
                });
              }}
            >
              <AntDesign name="search1" size={24} color="black" />
            </Pressable>
            <Pressable
              style={styles.actionsAdd}
              onPress={() => navigation.replace("ArqCrearPedidosDeObraScreen")}
            >
              <AntDesign name="pluscircleo" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        <View style={styles.listContainer}>
          {loading && <LoadingComponent />}
          {!loading && (
            <FlatList
              data={pedidosObra}
              renderItem={renderPedidoObra}
              keyExtractor={(item) => item.id}
              style={styles.List}
            />
          )}
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
      {modalParams?.actionLabel == "Filter" && (
        <FilterModal
          modalParams={modalParams}
          setParams={setModalParams}
          setElements={setPedidosObra}
        />
      )}
    </View>
  );
};

export default ArqConsultarPedidosDeObra;

const ShortInfo = ({ item }) => {
  return (
    <>
      <Text>Tipo de pedido: {label(item.TipoDePedido)}</Text>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>
      <Text>Estado: {item.Status}</Text>
      <Text>Fecha pedido: {fechaComun(item?.[commonAttrs.fechaCreacion])}</Text>
    </>
  );
};
