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
      console.log(queryObject);
      let query = createQuery(queryObject);

      console.log(query);

      const rawElements = await queryFSElements(entities.jornal, query);

      const completedElements = await completeElements(rawElements);

      

      const datos = consolidarJornales(
        completedElements,
        ...filter,
        commonAttrs.diasHombre
      );

      setData(datos);

      console.log("Los final elements son: ");
      console.log(completedElements);
      setJornales(completedElements);
      setLoading(false);
    };
    loading ? loadItems() : {};*/

    if (loading) {
      const completedElements = mockData.jornalesSemana;
      const datos = consolidarJornales(
        completedElements,
        ...filter,
        commonAttrs.diasHombre
      );
      setData(objectToArray(datos));
      setLoading(false);
    }
  }, [loading]);

  return (
    <View style={styles.container}>
      <Header backButton />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Reporte Rapido Jornales" />
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
