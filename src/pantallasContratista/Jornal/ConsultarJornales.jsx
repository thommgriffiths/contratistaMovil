import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { queryFSElements } from "../../Core/Firebase/FirebaseFirestoreManager";
import { completeElements, createQuery } from "../../Core/util/functions";
import { commonAttrs, entities } from "../../Core/util/entities";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Consultar.style";
import { palette } from "../../Core/colors";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import DeleteModal from "../../sharedComponents/DeleteModal";
import EditModal from "../../sharedComponents/EditModal";
import DetailModal from "../../sharedComponents/DetailModal";
import FilterModal from "../../sharedComponents/FilterModal";
import LoadingComponent from "../../sharedComponents/LoadingComponent";

const ConsultarJornales = ({ navigation }) => {
  const [jornales, setJornales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  useEffect(() => {
    const loadItems = async () => {
      let query = createQuery({
        [commonAttrs.creadoPor]: getLoggedUser().Email,
      });

      const rawElements = await queryFSElements(entities.jornal, query);
      const completedElements = await completeElements(rawElements);

      setJornales(completedElements);
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

  const renderJornal = ({ item }) => {
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
    <View style={styles.container}>
      <Header backTo="HomeContratista" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Jornales" />
          <View style={styles.actions}>
            <Pressable
              style={styles.actionsFilter}
              onPress={() => {
                setModalParams({
                  visible: true,
                  actionLabel: "Filter",
                  item: {
                    [commonAttrs.type]: entities.jornal,
                    filterUser: true,
                  },
                });
              }}
            >
              <MaterialIcons name="filter-list" size={30} color="white" />
            </Pressable>
            <Pressable
              style={styles.actionsAdd}
              onPress={() => navigation.replace("ContraCrearJornalScreen")}
            >
              <MaterialIcons name="add" size={30} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={styles.listContainer}>
          {loading && <LoadingComponent />}
          {!loading && (
            <FlatList
              data={jornales}
              renderItem={renderJornal}
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
          setElements={setJornales}
        />
      )}
    </View>
  );
};

export default ConsultarJornales;

const ShortInfo = ({ item }) => {
  return (
    <View style={styles.ShortInfo}>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>
      <Text style={{ fontWeight: "bold" }}>Dias hombre: {item.DiasHombre}</Text>
      <Text style={{ fontWeight: "bold" }}>
        Estado: {item[commonAttrs.jornalState]}
      </Text>
    </View>
  );
};
