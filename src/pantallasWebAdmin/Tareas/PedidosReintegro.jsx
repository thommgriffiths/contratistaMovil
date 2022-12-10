import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import { getFSCollectionAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import {
  completeElements,
  sortElementsByCommonAttribute,
  MontoTotal,
} from "../../Core/util/functions";
import { entities, commonAttrs } from "../../Core/util/entities";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import DeleteModal from "../../sharedComponents/DeleteModal";
import EditModal from "../../sharedComponents/EditModal";
import DetailModal from "../../sharedComponents/DetailModal";
import SortingModal from "../../sharedComponents/SortingModal";
import LoadingComponent from "../../sharedComponents/LoadingComponent";
import styles from "../styles/Consultar.style";

const AdminPedidosDeReintegro = ({ navigation }) => {
  const [pedidosReintegro, setPedidosReintegro] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  const [sortingParams, setSortingParams] = useState({
    attr: commonAttrs.fechaCreacion,
    asc: true,
  });

  useEffect(() => {
    const loadItems = async () => {
      const rawElements = await getFSCollectionAsync(
        entities.pedidoDeReintegro
      );
      console.log("Los raw elements son: ");
      console.log(rawElements);
      const elements = await completeElements(rawElements);

      const sortedElements = sortElementsByCommonAttribute(
        elements,
        sortingParams.attr,
        sortingParams.asc
      );

      console.log("Los final elements son: ");
      console.log(sortedElements);
      setPedidosReintegro(sortedElements);
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
            style={styles.ListItemEdit}
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "Editar",
                item: item,
              });
            }}
          />
          <Pressable
            style={styles.ListItemDelete}
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "Eliminar",
                item: item,
              });
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header backButton />
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
              <Text style={styles.actionsAddText}>Ordenar</Text>
            </Pressable>
            <Pressable
              style={styles.actionsAdd}
              onPress={() => navigation.replace("CrearPedidoDeReintegroScreen")}
            >
              <Text style={styles.actionsAddText}>+ nuevo</Text>
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
      {modalParams?.actionLabel == "Eliminar" && (
        <DeleteModal modalParams={modalParams} setParams={setModalParams} />
      )}
      {modalParams?.actionLabel == "Editar" && (
        <EditModal modalParams={modalParams} setParams={setModalParams} />
      )}
      {modalParams?.actionLabel == "showDetail" && (
        <DetailModal modalParams={modalParams} setParams={setModalParams} />
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
            "Monto",
          ]}
        />
      )}
    </View>
  );
};

export default AdminPedidosDeReintegro;

const ShortInfo = ({ item }) => {
  return (
    <>
      <Text>Título: {item.Descripcion}</Text>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>
      <Text> </Text>
      <Text>Pedido por: {item?.[commonAttrs.creadoPor]}</Text>
      <Text>Monto: $ {item.Monto}</Text>
    </>
  );
};
