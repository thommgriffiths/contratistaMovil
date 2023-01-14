import { FlatList, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/Consultar.style";
import Header from "../../sharedComponents/Header";
import Titles from "../../sharedComponents/Titles";
import StatusFilter from "./StatusFilter";
import { commonAttrs, entities } from "../../Core/util/entities";
import { queryFSElements } from "../../Core/Firebase/FirebaseFirestoreManager";
import {
  createQuery,
  completeElements,
  sortElementsByCommonAttribute,
} from "../../Core/util/functions";
import LoadingComponent from "../../sharedComponents/LoadingComponent";

//Aca voy a listar todas las obras (uso el mismo que consultar obras)
//y al hacer click pongo todo lo que paso con X contesto las ultimas 2 semanas
//Traigo tareas, jornales y tareas arquitectos ordenados por fechas de las ultimas dos semanas
//Esto es como ver actividades por obra

const AdminEstadosObra = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (o, dias) => {
    setLoading(true);

    let now = Date.now();

    let diasEnMilisegundos = dias * 24 * 60 * 60 * 1000;

    let newQuery = createQuery({
      [entities.obra]: o,
      [commonAttrs.fechaCreacionRango]: {
        startDate: now - diasEnMilisegundos,
      },
    });

    const jornales = await queryFSElements(entities.jornal, newQuery);

    const pedidosObra = await queryFSElements(entities.pedidoDeObra, newQuery);

    const pedidosReintegro = await queryFSElements(
      entities.pedidoDeReintegro,
      newQuery
    );

    const rawElements = [...jornales, ...pedidosObra, ...pedidosReintegro];

    const completedElements = await completeElements(rawElements);

    const sortedElements = sortElementsByCommonAttribute(
      completedElements,
      commonAttrs.fechaCreacion,
      false
    );
    setItems(sortedElements);
    setLoading(false);
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case entities.jornal:
        console.log("opcion jornal");
        return <ShortInfoJornal item={item} />;
      case entities.pedidoDeReintegro:
        console.log("opcion reintegro");
        return <ShortInfoReintegro item={item} />;
      case entities.pedidoDeObra:
        console.log("opcion pedido de obra");
        return <ShortInfoPO item={item} />;
    }
  };
  return (
    <View style={styles.container}>
      <Header backTo="AdminHomeScreen" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Estados de obra" />
        </View>
        <StatusFilter open={true} onSearch={onSearch} />
        <View style={styles.listContainer}>
          {loading && <LoadingComponent />}
          {!loading && (
            <FlatList
              data={items}
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

const ShortInfoPO = ({ item }) => {
  return (
    <View style={[styles.ListItem, { flexDirection: "column" }]}>
      <Text>Título: {item.Descripcion}</Text>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>

      <Text style={{ fontWeight: "bold" }}>Monto: ${item.Monto}</Text>
      <Text style={{ fontWeight: "bold" }}>Estado: {item.Status}</Text>
    </View>
  );
};

const ShortInfoJornal = ({ item }) => {
  return (
    <View style={[styles.ListItem, { flexDirection: "column" }]}>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>
      <Text style={{ fontWeight: "bold" }}>Dias hombre: {item.DiasHombre}</Text>
      <Text style={{ fontWeight: "bold" }}>Estado: {item.Status}</Text>
    </View>
  );
};

const ShortInfoReintegro = ({ item }) => {
  return (
    <View style={[styles.ListItem, { flexDirection: "column" }]}>
      <Text>Título: {item.Descripcion}</Text>
      <Text>Obra: {item.obra?.Nombre}</Text>
      <Text>Rubro: {item.rubro?.Nombre}</Text>

      <Text style={{ fontWeight: "bold" }}>Monto: ${item.Monto}</Text>
      <Text style={{ fontWeight: "bold" }}>Estado: {item.Status}</Text>
    </View>
  );
};
