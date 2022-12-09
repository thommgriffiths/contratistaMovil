import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import { getFSCollectionAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import {
  completeElements,
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

const AdminTodasTareas = ({ navigation }) => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  const [sortingParams, setSortingParams] = useState({
    attr: commonAttrs.fechaCreacion,
    asc: true,
  });

  useEffect(() => {
    const loadItems = async () => {
      const pedidosDeObra = await getFSCollectionAsync(entities.pedidoDeObra);
      const pedidosDeReintegro = await getFSCollectionAsync(
        entities.pedidoDeReintegro
      );
      const allElementsRaw = [...pedidosDeObra, ...pedidosDeReintegro];

      const completedElements = await completeElements(allElementsRaw);

      const sortedElements = sortElementsByCommonAttribute(
        completedElements,
        sortingParams.attr,
        sortingParams.asc
      );

      console.log("todos los elementos son: ");
      console.log(sortedElements);

      setTareas(sortedElements);
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

  const renderTarea = ({ item }) => {
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
        {/*
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
          </View>*/}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header backButton />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Todas Tareas" />
          <View style={styles.actions}>
            {/*
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
              <Text style={styles.actionsFilterText}>Buscar</Text>
            </Pressable>
            <Pressable
              style={styles.actionsAdd}
              onPress={() => navigation.replace("CrearPedidoDeObraScreen")}
            >
              <Text style={styles.actionsAddText}>+ nuevo</Text>
            </Pressable> */}
          </View>
        </View>

        <View style={styles.listContainer}>
          {loading && <LoadingComponent />}
          {!loading && (
            <FlatList
              data={tareas}
              renderItem={renderTarea}
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
          setElements={setTareas}
        />
      )}
    </View>
  );
};

export default AdminTodasTareas;

const ShortInfo = ({ item }) => {
  if (item[commonAttrs.type] == entities.pedidoDeObra)
    return (
      <>
        <Text>Tipo de pedido: {item.TipoDePedido}</Text>
        <Text>id: {item.id}</Text>
        <Text>obra: {item.obra?.Nombre}</Text>
        <Text>rubro: {item.rubro?.Nombre}</Text>
      </>
    );
  if (item[commonAttrs.type] == entities.pedidoDeReintegro)
    return (
      <>
        <Text>id: {item.id}</Text>
        <Text>Monto: {item.Monto}</Text>
        <Text>obra: {item.obra?.Nombre}</Text>
        <Text>rubro: {item.rubro?.Nombre}</Text>
      </>
    );
};
