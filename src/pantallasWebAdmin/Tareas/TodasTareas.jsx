import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  completeElements,
  sortElementsByCommonAttribute,
  fechaComun,
} from "../../Core/util/functions";
import { label } from "../../Core/util/labels";
import { commonAttrs, entities } from "../../Core/util/entities";
import { getFSCollectionAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import styles from "../styles/Consultar.style";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import DetailModal from "../../sharedComponents/Modals/DetailModal";
import SortingModal from "../../sharedComponents/Modals/SortingModal";
import LoadingComponent from "../../sharedComponents/LoadingComponent";

const AdminTodasTareas = () => {
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
        entities.pReintegro
      );
      const allElementsRaw = [...pedidosDeObra, ...pedidosDeReintegro];

      const completedElements = await completeElements(allElementsRaw);

      const sortedElements = sortElementsByCommonAttribute(
        completedElements,
        sortingParams.attr,
        sortingParams.asc
      );

      setTareas(sortedElements);
      setLoading(false);
    };
    loading ? loadItems() : {};
  }, [loading]);

  useEffect(() => {
    console.log(modalParams);
    if (modalParams["actionLabel"] == "Sort" && !modalParams?.["visible"]) {
      console.log("los sorting params son:");
      console.log(sortingParams);
      let elements = sortElementsByCommonAttribute(
        tareas,
        sortingParams.attr,
        sortingParams.asc
      );

      setModalParams({ visible: false });
      setTareas(elements);
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header backTo="AdminHomeScreen" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Todas Tareas" />
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
          ]}
        />
      )}
    </View>
  );
};

export default AdminTodasTareas;

const ShortInfo = ({ item }) => {
  if (item[commonAttrs.type] == entities.pedidoDeObra)
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
  if (item[commonAttrs.type] == entities.pReintegro)
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
