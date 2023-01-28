import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  completeElements,
  sortElementsByCommonAttribute,
  MontoTotal,
} from "../../Core/util/functions";
import { entities, commonAttrs } from "../../Core/util/entities";
import { getFSCollectionAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import { palette } from "../../Core/colors";
import styles from "../styles/Consultar.style";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import DetailModal from "../../sharedComponents/Modals/DetailModal";
import SortingModal from "../../sharedComponents/Modals/SortingModal";
import LoadingComponent from "../../sharedComponents/LoadingComponent";
import PRActionsModal from "./PRActionsModal";

const AdminPedidosDeReintegro = () => {
  const [pedidosReintegro, setPedidosReintegro] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  const [sortingParams, setSortingParams] = useState({
    attr: commonAttrs.fechaCreacion,
    asc: true,
  });

  useEffect(() => {
    const loadItems = async () => {
      const rawElements = await getFSCollectionAsync(entities.pReintegro);
      const completedElements = await completeElements(rawElements);

      const sortedElements = sortElementsByCommonAttribute(
        completedElements,
        sortingParams.attr,
        sortingParams.asc
      );

      setPedidosReintegro(sortedElements);
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
    if (modalParams["actionLabel"] == "Sort" && !modalParams?.["visible"]) {
      console.log("los sorting params son:");
      console.log(sortingParams);
      let elements = sortElementsByCommonAttribute(
        pedidosReintegro,
        sortingParams.attr,
        sortingParams.asc
      );
      setModalParams({ visible: false });

      setPedidosReintegro(elements);
    }
  }, [modalParams]);

  const renderPedidoReintegro = ({ item }) => {
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
    );
  };

  return (
    <View style={styles.container}>
      <Header backTo="AdminHomeScreen" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Pedidos de Reintegro" />
          <View style={styles.actions}>
            <Pressable
              style={styles.actionsFilter}
              onPress={() => {
                setModalParams({
                  visible: true,
                  actionLabel: "Sort",
                });
              }}
            >
              <MaterialIcons name="filter-list" size={30} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={styles.ListItem}>
          <View style={styles.ListItemText}>
            <Text>Monto total en lista: ${MontoTotal(pedidosReintegro)}</Text>
          </View>
        </View>

        <View style={styles.listContainer}>
          {loading && <LoadingComponent />}
          {!loading && (
            <FlatList
              data={pedidosReintegro}
              renderItem={renderPedidoReintegro}
              keyExtractor={(item) => item.id}
              style={styles.List}
            />
          )}
        </View>
      </View>
      {modalParams?.actionLabel == "showDetail" && (
        <DetailModal modalParams={modalParams} setParams={setModalParams} />
      )}
      {modalParams?.actionLabel == "Actions" && (
        <PRActionsModal modalParams={modalParams} setParams={setModalParams} />
      )}
      {modalParams?.actionLabel == "Sort" && (
        <SortingModal
          modalParams={modalParams}
          setParams={setModalParams}
          setSortingParams={setSortingParams}
          sortingVariables={[
            commonAttrs.fechaCreacion,
            entities.obra,
            entities.rubro,
            commonAttrs.monto,
          ]}
        />
      )}
    </View>
  );
};

export default AdminPedidosDeReintegro;

const ShortInfo = ({ item }) => {
  return (
    <View style={styles.ShortInfo}>
      <Text>Título: {item.Descripcion}</Text>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>
      <Text style={{ fontWeight: "bold" }}>
        Monto: ${item[commonAttrs.monto]}
      </Text>
      <Text style={{ fontWeight: "bold" }}>
        Estado: {item[commonAttrs.PRState]}
      </Text>
    </View>
  );
};
