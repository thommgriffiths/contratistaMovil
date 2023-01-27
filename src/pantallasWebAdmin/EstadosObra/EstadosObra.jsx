import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import {
  createQuery,
  completeElements,
  sortElementsByCommonAttribute,
  filterByAttributes,
} from "../../Core/util/functions";
import { commonAttrs, entities } from "../../Core/util/entities";
import { queryFSElements } from "../../Core/Firebase/FirebaseFirestoreManager";
import styles from "../styles/Consultar.style";

import LoadingComponent from "../../sharedComponents/LoadingComponent";
import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import StatusFilter from "./StatusFilter";
import TypesFilter from "./TypesFilter";
import renderItem from "./renderItem";

const defaultFilter = [
  entities.jornal,
  entities.pedidoDeObra,
  entities.pReintegro,
];

const AdminEstadosObra = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(defaultFilter);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (o, dias) => {
    setLoading(true);
    const values = await onSearch(o, dias);
    setItems(values);
    let filteredElements = filterByAttributes(values, commonAttrs.type, filter);
    setFilteredItems(filteredElements);
    setLoading(false);
  };

  useEffect(() => {
    let filteredElements = filterByAttributes(items, commonAttrs.type, filter);
    setFilteredItems(filteredElements);
  }, [filter]);

  return (
    <View style={styles.container}>
      <Header backTo="AdminHomeScreen" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Estados de obra" />
          <TypesFilter action={setFilter} filter={filter} />
        </View>
        <View style={styles.filterContainer}>
          <StatusFilter open={true} onSearch={search} />
        </View>

        <View style={styles.listContainer}>
          {loading && <LoadingComponent />}
          {!loading && (
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.List}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default AdminEstadosObra;

const onSearch = async (o, dias) => {
  const now = Date.now();
  const diasEnMilisegundos = dias * 24 * 60 * 60 * 1000;
  const newQuery = createQuery({
    [entities.obra]: o,
    [commonAttrs.fechaCreacionRango]: {
      startDate: now - diasEnMilisegundos,
    },
  });

  const jornales = await queryFSElements(entities.jornal, newQuery);
  const pedidosObra = await queryFSElements(entities.pedidoDeObra, newQuery);
  const pedidosReintegro = await queryFSElements(entities.pReintegro, newQuery);

  const allElements = [...jornales, ...pedidosObra, ...pedidosReintegro];
  const completedElements = await completeElements(allElements);
  const sortedElements = sortElementsByCommonAttribute(
    completedElements,
    commonAttrs.fechaCreacion,
    false
  );

  return sortedElements;
};
