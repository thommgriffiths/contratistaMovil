import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import {
  completeElements,
  getLastNDaysRange,
  createQuery,
  sortElementsByCommonAttribute,
} from "../../Core/util/functions";
import { commonAttrs, entities, jornalStates } from "../../Core/util/entities";
import { queryFSElements } from "../../Core/Firebase/FirebaseFirestoreManager";
import styles from "../styles/Consultar.style";

import ValidarJornal from "./ValidarJornales";
import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import DetailModal from "../../sharedComponents/Modals/DetailModal";
import FilterModal from "../../sharedComponents/Modals/FilterModal";
import LoadingComponent from "../../sharedComponents/LoadingComponent";

const ArqValidarJornales = () => {
  const [rawJornales, setRawJornales] = useState([]);
  const [jornales, setJornales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  useEffect(() => {
    const loadItems = async () => {
      let query = createQuery({
        [commonAttrs.fechaCreacionRango]: getLastNDaysRange(15),
      });

      console.log("query", query);

      const rawElements = await queryFSElements(entities.jornal, query);
      const completedElements = await completeElements(rawElements);

      setRawJornales(completedElements);
      setLoading(false);
    };
    loading ? loadItems() : {};
  }, [loading]);

  useEffect(() => {
    const filteredElements = rawJornales.filter((element) => {
      return element[commonAttrs.jornalState] != jornalStates.payed;
    });

    const sortedElements = sortElementsByCommonAttribute(
      filteredElements,
      commonAttrs.fechaCreacion,
      false
    );

    setJornales(sortedElements);
  }, [rawJornales]);

  useEffect(() => {
    console.log(modalParams);
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
        <ValidarJornal item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backTo="ArqHomeScreen" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Validar Jornales" />
          <View style={styles.actions}>
            <Pressable
              style={styles.actionsFilter}
              onPress={() => {
                setModalParams({
                  visible: true,
                  actionLabel: "Filter",
                  item: { [commonAttrs.type]: entities.jornal },
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
              data={jornales}
              renderItem={renderJornal}
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
          setElements={setRawJornales}
        />
      )}
    </SafeAreaView>
  );
};

export default ArqValidarJornales;

const ShortInfo = ({ item }) => {
  return (
    <View style={styles.ShortInfo}>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>
      <Text>Solicitante: {item[commonAttrs.creadoPor]}</Text>
      <Text style={{ fontWeight: "bold" }}>Dias hombre: {item.DiasHombre}</Text>
    </View>
  );
};
