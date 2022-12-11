import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import {
  getFSCollectionAsync,
  queryFSElements,
} from "../../Core/Firebase/FirebaseFirestoreManager";
import {
  completeElements,
  MontoTotal,
  createQuery,
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
        [commonAttrs.creadoPor]: getLoggedUser().email,
      });

      const rawElements = await queryFSElements(
        entities.pedidoDeReintegro,
        query
      );

      console.log("Los raw elements son: ");
      console.log(rawElements);
      const finalElements = await completeElements(rawElements);
      console.log("Los final elements son: ");
      console.log(finalElements);
      setPedidosReintegro(finalElements);
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
              style={styles.actionsAdd}
              onPress={() => navigation.replace("CrearPedidoDeReintegroScreen")}
            >
              <Text style={styles.actionsAddText}>+ nuevo</Text>
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
      <Text>Monto: ${item.Monto}</Text>
    </>
  );
};
