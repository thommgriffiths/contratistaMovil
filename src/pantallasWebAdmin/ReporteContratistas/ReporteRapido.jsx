import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { queryFSElements } from "../../Core/Firebase/FirebaseFirestoreManager";
import {
  completeElements,
  getCurrentWeekDates,
  createQuery,
  objectToArray,
  sumInternalValues,
} from "../../Core/util/functions";
import { commonAttrs, entities } from "../../Core/util/entities";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import LoadingComponent from "../../sharedComponents/LoadingComponent";
import styles from "../styles/Consultar.style";
import { palette } from "../../Core/colors";

import { renderCapsule } from "./renderCapsule";
import { AdminReporteRapido as mockData } from "../../Core/util/mockData";

const AdminReporteRapido = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rawItems, setRawItems] = useState([]);

  const [filter, setFilter] = useState([
    entities.obra,
    commonAttrs.creadoPor,
    entities.rubro,
  ]);

  useEffect(() => {
    /*
    const loadItems = async () => {
     
      let queryObject = {
        [commonAttrs.fechaCreacionRango]: getCurrentWeekDates(),
      };
      let query = createQuery(queryObject);

      const rawElements = await queryFSElements(entities.jornal, query);
      const completedElements = await completeElements(rawElements);

      setRawItems(completedElements);
    };
    if (loading) loadItems();*/
    if (loading) setRawItems(mockData.jornalesSemana);
  }, [loading]);

  useEffect(() => {
    const datos = consolidarJornales(
      rawItems,
      ...filter,
      commonAttrs.diasHombre
    );
    setData(objectToArray(datos));
    setLoading(false);
  }, [rawItems, filter]);

  const Tree = () => {
    return (
      <View style={localStyles.treeContainer}>
        <Pressable
          style={[
            localStyles.treeButton,
            {
              backgroundColor:
                filter[0] == entities.obra
                  ? palette.R3
                  : filter[1] == entities.obra
                  ? palette.R1
                  : "white",
            },
          ]}
          onPress={() => setFirst(entities.obra)}
        >
          <Text>Obra</Text>
        </Pressable>
        <Pressable
          style={[
            localStyles.treeButton,
            {
              backgroundColor:
                filter[0] == commonAttrs.creadoPor
                  ? palette.R3
                  : filter[1] == commonAttrs.creadoPor
                  ? palette.R1
                  : "white",
            },
          ]}
          onPress={() => setFirst(commonAttrs.creadoPor)}
        >
          <Text>Contratista</Text>
        </Pressable>
        <Pressable
          style={[
            localStyles.treeButton,
            {
              backgroundColor:
                filter[0] == entities.rubro
                  ? palette.R3
                  : filter[1] == entities.rubro
                  ? palette.R1
                  : "white",
            },
          ]}
          onPress={() => setFirst(entities.rubro)}
        >
          <Text>Rubro</Text>
        </Pressable>
      </View>
    );
  };

  const setFirst = (value) => {
    let arr = [...filter];
    let fi = arr.indexOf(value);
    arr.splice(fi, 1);
    arr.splice(0, 0, value);
    setFilter(arr);
  };

  return (
    <View style={styles.container}>
      <Header backTo="AdminHomeScreen" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Reporte Rapido Jornales" />
          <Tree />
        </View>

        <View style={styles.listContainer}>
          {loading && <LoadingComponent />}
          {!loading && (
            <FlatList
              data={data}
              renderItem={renderCapsule}
              keyExtractor={(item) => Object.keys(item)[0]}
              style={styles.List}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default AdminReporteRapido;

const consolidarJornales = (objects, first, second, third, value) => {
  var result = {};

  for (var object of objects) {
    var primary = object[first]["Nombre"]
      ? object[first]["Nombre"]
      : object[first];
    var secondary = object[second]["Nombre"]
      ? object[second]["Nombre"]
      : object[second];
    var tertiary = object[third]["Nombre"]
      ? object[third]["Nombre"]
      : object[third];

    var parsedValue = parseInt(object[value]);

    result[primary] = result[primary] ?? {};
    result[primary][secondary] = result[primary][secondary] ?? {};
    result[primary][secondary][tertiary] = result[primary][secondary][tertiary]
      ? result[primary][secondary][tertiary] + parsedValue
      : parsedValue;
  }

  return result;
};

const localStyles = StyleSheet.create({
  treeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  treeButton: {
    margin: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: palette.R4,
  },
});
