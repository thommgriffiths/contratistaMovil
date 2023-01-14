import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { queryFSElements } from "../../Core/Firebase/FirebaseFirestoreManager";
import {
  completeElements,
  MontoTotal,
  createQuery,
  sortElementsByCommonAttribute,
} from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import { entities, commonAttrs } from "../../Core/util/entities";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import DeleteModal from "../../sharedComponents/DeleteModal";
import EditModal from "../../sharedComponents/EditModal";
import DetailModal from "../../sharedComponents/DetailModal";
import LoadingComponent from "../../sharedComponents/LoadingComponent";
import styles from "../styles/Consultar.style";

const ConsultarPedidosDeReintegro = ({ navigation }) => {
  const [pedidosReintegro, setPedidosReintegro] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  useEffect(() => {
    const loadItems = async () => {
      let query = createQuery({
        [commonAttrs.creadoPor]: getLoggedUser().Email,
      });

      const rawElements = await queryFSElements(
        entities.pedidoDeReintegro,
        query
      );
      const completedElements = await completeElements(rawElements);
      console.log("Los final elements son: ");
      console.log(completedElements);

      const sortedElements = sortElementsByCommonAttribute(
        completedElements,
        commonAttrs.fechaCreacion,
        false
      );

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
      <Header backTo="HomeContratista" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Reintegros Adicionales" />
          <View style={styles.actions}>
            <Pressable
              style={styles.actionsAdd}
              onPress={() =>
                navigation.replace("ContraCrearPedidoDeReintegroScreen")
              }
            >
              <AntDesign name="pluscircleo" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        <View style={styles.ListItem}>
          <View style={styles.ListItemText}>
            <Text>Monto total: ${MontoTotal(pedidosReintegro)}</Text>
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
    </View>
  );
};

export default ConsultarPedidosDeReintegro;

const ShortInfo = ({ item }) => {
  return (
    <>
      <Text>Título: {item.Descripcion}</Text>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>

      <Text style={{ fontWeight: "bold" }}>Monto: ${item.Monto}</Text>
      <Text style={{ fontWeight: "bold" }}>Estado: {item.Status}</Text>
    </>
  );
};
