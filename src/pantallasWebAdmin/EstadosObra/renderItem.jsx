import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { fechaComun } from "../../Core/util/functions";
import { commonAttrs, entities } from "../../Core/util/entities";
import { label } from "../../Core/util/labels";
import { palette } from "../../Core/colors";
import styles from "../styles/Consultar.style";

const renderItem = ({ item }) => {
  switch (item.type) {
    case entities.jornal:
      return <ShortInfoJornal item={item} />;
    case entities.pReintegro:
      return <ShortInfoReintegro item={item} />;
    case entities.pedidoDeObra:
      return <ShortInfoPO item={item} />;
  }
};

const ShortInfoPO = ({ item }) => {
  return (
    <View style={localStyles.ListItem}>
      <View style={localStyles.typeView}>
        <Text>Tipo: {label(item.TipoDePedido)}</Text>
        <Text>
          Fecha pedido: {fechaComun(item?.[commonAttrs.fechaCreacion])}
        </Text>
        <Text>Solicitante: {item?.[commonAttrs.creadoPor]}</Text>
      </View>

      <View style={localStyles.detailView}>
        <Text>Rubro: {item.rubro?.Nombre}</Text>
        <Text>Tarea: {item?.[commonAttrs.tarea]}</Text>
        <Text>Solicitud: {item?.[commonAttrs.descripcion]}</Text>
      </View>

      <View style={localStyles.status}>
        <Text>Estado: {item[commonAttrs.POState]}</Text>
      </View>
    </View>
  );
};

const ShortInfoJornal = ({ item }) => {
  return (
    <View style={localStyles.ListItem}>
      <View style={localStyles.typeView}>
        <Text>Tipo: Jornal</Text>
        <Text>
          Fecha pedido: {fechaComun(item?.[commonAttrs.fechaCreacion])}
        </Text>
        <Text>Solicitante: {item?.[commonAttrs.creadoPor]}</Text>
      </View>

      <View style={localStyles.detailView}>
        <Text>Rubro: {item.rubro?.Nombre}</Text>
        <Text>Tarea: {item?.[commonAttrs.tarea]}</Text>
        <Text>Dias hombre: {item.DiasHombre}</Text>
      </View>

      <View style={localStyles.status}>
        <Text>Estado: {item[commonAttrs.jornalState]}</Text>
      </View>
    </View>
  );
};

const ShortInfoReintegro = ({ item }) => {
  return (
    <View style={localStyles.ListItem}>
      <View style={localStyles.typeView}>
        <Text>Tipo: Solicitud Reembolso</Text>
        <Text>
          Fecha pedido: {fechaComun(item?.[commonAttrs.fechaCreacion])}
        </Text>
        <Text>Solicitante: {item?.[commonAttrs.creadoPor]}</Text>
      </View>

      <View style={localStyles.detailView}>
        <Text>Rubro: {item.rubro?.Nombre}</Text>
        <Text>Tarea: {item?.[commonAttrs.tarea]}</Text>
        <Text>Justificacion: {item.Descripcion}</Text>
        <Text>Monto: ${item[commonAttrs.monto]}</Text>
      </View>

      <View style={localStyles.status}>
        <Text>Estado: {item[commonAttrs.PRState]}</Text>
      </View>
    </View>
  );
};

export default renderItem;

const localStyles = StyleSheet.create({
  ListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: palette.neutral,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: palette.B1,
    borderWidth: 2,
  },

  ListItemVertical: {
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: palette.neutral,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: palette.B1,
    borderWidth: 2,
    flexDirection: "column",
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },

  typeView: {
    backgroundColor: palette.white,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    width: "25%",
  },
  detailView: {
    backgroundColor: palette.white,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    width: "40%",
  },
  status: {
    backgroundColor: palette.white,
    justifyContent: "center",
    alignContent: "stretch",
    borderRadius: 10,
    padding: 10,
    width: "10%",
  },
});
