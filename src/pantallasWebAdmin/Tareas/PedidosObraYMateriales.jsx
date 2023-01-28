import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  completeElements,
  sortElementsByCommonAttribute,
  fechaComun,
} from "../../Core/util/functions";
import { getFSCollectionAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import { commonAttrs, entities } from "../../Core/util/entities";
import { label } from "../../Core/util/labels";
import { palette } from "../../Core/colors";
import styles from "../styles/Consultar.style";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import DetailModal from "../../sharedComponents/Modals/DetailModal";
import FilterModal from "../../sharedComponents/Modals/FilterModal";
import POActionsModal from "./POActionsModal";
import LoadingComponent from "../../sharedComponents/LoadingComponent";

const AdminPedidosDeObraYMateriales = () => {
  const [pedidosObra, setPedidosObra] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  const [sortingParams, setSortingParams] = useState({
    attr: commonAttrs.fechaCreacion,
    asc: true,
  });

  useEffect(() => {
    const loadItems = async () => {
      const rawElements = await getFSCollectionAsync(entities.pedidoDeObra);
      const completedElements = await completeElements(rawElements);

      const sortedElements = sortElementsByCommonAttribute(
        completedElements,
        sortingParams.attr,
        sortingParams.asc
      );

      setPedidosObra(sortedElements);
      setLoading(false);
    };
    loading ? loadItems() : {};
  }, [loading]);

  useEffect(() => {
    console.log(modalParams);
    if (modalParams["affectedItem"] != undefined) {
      setModalParams({ visible: false });
      setLoading(true);
    }
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
          <View style={styles.ListItemActions}>
            <Pressable
              style={styles.ListItemAction}
              onPress={() => {
                setModalParams({
                  visible: true,
                  actionLabel: "Actions",
                  item: item,
                });
              }}
            >
              <MaterialIcons name="edit" size={24} color={palette.B1} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header backTo="AdminHomeScreen" />
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
              <MaterialIcons name="filter-list" size={30} color="white" />
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
      {modalParams?.actionLabel == "Actions" && (
        <POActionsModal modalParams={modalParams} setParams={setModalParams} />
      )}
    </View>
  );
};

export default AdminPedidosDeObraYMateriales;

const ShortInfo = ({ item }) => {
  return (
    <View style={styles.ShortInfo}>
      <Text>Tipo de pedido: {label(item.TipoDePedido)}</Text>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>
      <Text style={{ fontWeight: "bold" }}>
        Estado: {item[commonAttrs.POState]}
      </Text>
      <Text style={{ fontWeight: "bold" }}>
        Fecha pedido: {fechaComun(item?.[commonAttrs.fechaCreacion])}
      </Text>
    </View>
  );
};
