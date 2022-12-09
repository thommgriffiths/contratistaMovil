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

import { AdminReporteRapido as mockData } from "../../Core/util/mockData";

const AdminReporteRapido = () => {
  const [jornales, setJornales] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([
    entities.obra,
    commonAttrs.creadoPor,
    entities.rubro,
  ]);
  const [data, setData] = useState([]);

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
    };*/
    //loading ? loadItems() : {};
    if (loading) {
      const completedElements = mockData.jornalesSemana;
      //setJornales(completedElements);

      //cambiar a jornales despues
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

const renderCapsule = ({ item }) => {
  var totalNumber = sumInternalValues(item);
  var titulo = Object.keys(item)[0];
  return (
    <View style={customStyles.capsule}>
      <View style={customStyles.capsuleBody}>
        <View style={customStyles.capsuleTitle}>
          <Text style={customStyles.capsuleTitleText}>{titulo}</Text>
          <View style={customStyles.underline}></View>
        </View>
        <View style={customStyles.capsuleData}>
          <Text>Aca iria la data</Text>
        </View>
      </View>
      <View style={customStyles.capsuleNumber}>
        <Text style={customStyles.capsuleNumberText}>TOTAL</Text>
        <Text style={customStyles.capsuleNumberText}>{totalNumber}</Text>
      </View>
    </View>
  );
};

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

const customStyles = StyleSheet.create({
  capsule: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: palette.neutral,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: palette.B1,
    borderWidth: 2,
  },
  capsuleBody: {
    flex: 1,
    //padding: 10,
  },
  capsuleNumber: {
    //flex: 2,

    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  capsuleTitle: {
    flex: 3,
  },
  capsuleTitleText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 25,
    flex: 10,
  },
  underline: {
    backgroundColor: "black",
    flex: 2,
  },
  capsuleData: {
    flex: 7,
    paddingTop: 10,
    alignContent: "center",
  },
  capsuleNumberText: {
    fontWeight: "bold",
    fontSize: 35,
  },
});
