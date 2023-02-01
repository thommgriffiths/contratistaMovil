import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import {
  completeElements,
  MontoTotal,
  createQuery,
  sortElementsByCommonAttribute,
} from "../../Core/util/functions";
import { commonAttrs, entities, PRStates } from "../../Core/util/entities";
import { queryFSElements } from "../../Core/Firebase/FirebaseFirestoreManager";
import { getLoggedUser } from "../../Core/util/globalStore";
import { palette } from "../../Core/colors";
import styles from "../styles/Consultar.style";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import DeleteModal from "../../sharedComponents/Modals/DeleteModal";
import EditModal from "../../sharedComponents/Modals/EditModal";
import DetailModal from "../../sharedComponents/Modals/DetailModal";
import LoadingComponent from "../../sharedComponents/LoadingComponent";

const ArqConsultarPedidosDeReintegro = ({ navigation }) => {
  const [pedidosReintegro, setPedidosReintegro] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  useEffect(() => {
    const loadItems = async () => {
      let query = createQuery({
        [commonAttrs.creadoPor]: getLoggedUser().Email,
      });

      const rawElements = await queryFSElements(entities.pReintegro, query);
      const completedElements = await completeElements(rawElements);

      const filteredElements = completedElements.filter((element) => {
        return element[commonAttrs.PRState] != PRStates.reembolsado;
      });

      const sortedElements = sortElementsByCommonAttribute(
        filteredElements,
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
    let editDisabled = item[commonAttrs.PRState] != PRStates.pedido;
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
            style={[
              styles.ListItemAction,
              {
                backgroundColor: editDisabled ? palette.neutral : palette.white,
              },
            ]}
            disabled={editDisabled}
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "Editar",
                item: item,
              });
            }}
          >
            <MaterialIcons name="edit" size={24} color={palette.B1} />
          </Pressable>
          <Pressable
            style={styles.ListItemAction}
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "Eliminar",
                item: item,
              });
            }}
          >
            <MaterialIcons name="delete" size={24} color="red" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backTo="ArqHomeScreen" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Reembolsos" />
          <View style={styles.actions}>
            <Pressable
              style={styles.actionsAdd}
              onPress={() =>
                navigation.replace("ArqCrearPedidoDeReintegroScreen")
              }
            >
              <MaterialIcons name="add" size={30} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={styles.ListItem}>
          <View style={styles.montoLabel}>
            <Text style={{ fontWeight: "bold" }}>
              Monto total: ${MontoTotal(pedidosReintegro)}
            </Text>
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
    </SafeAreaView>
  );
};

export default ArqConsultarPedidosDeReintegro;

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
