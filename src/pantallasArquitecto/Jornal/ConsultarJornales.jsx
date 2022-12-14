import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";

import { getFSCollectionAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import { completeElements } from "../../Core/util/functions";
import { commonAttrs, entities } from "../../Core/util/entities";

import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import ValidarJornal from "./ValidarJornales";
import EditModal from "../../sharedComponents/EditModal";
import DetailModal from "../../sharedComponents/DetailModal";
import FilterModal from "../../sharedComponents/FilterModal";
import LoadingComponent from "../../sharedComponents/LoadingComponent";
import styles from "../styles/Consultar.style";

//Las funciones aca deberian ser solo mirar o validar

const ArqValidarJornales = () => {
  const [jornales, setJornales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  useEffect(() => {
    const loadItems = async () => {
      const rawElements = await getFSCollectionAsync(entities.jornal);
      console.log("Los raw elements son: ");
      console.log(rawElements);
      const finalElements = await completeElements(rawElements);
      console.log("Los final elements son: ");
      console.log(finalElements);
      setJornales(finalElements);
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
        <ValidarJornal item={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header backButton />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Ver y validar jornales" />
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
              <AntDesign name="search1" size={24} color="black" />
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
          setElements={setJornales}
        />
      )}
    </View>
  );
};

export default ArqValidarJornales;

const ShortInfo = ({ item }) => {
  return (
    <>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>
      <Text style={{ fontWeight: "bold" }}>Dias hombre: {item.DiasHombre}</Text>
    </>
  );
};
