import React from "react";
import { View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { palette } from "../../Core/colors";

import { entities } from "../../Core/util/entities";

const TypesFilter = ({ action, filter }) => {
  const addOrPop = (value) => {
    let newFilter = [...filter];
    const index = newFilter.indexOf(value);
    index >= 0 ? newFilter.splice(index, 1) : newFilter.push(value);
    action(newFilter);
  };

  return (
    <View style={localStyles.container}>
      <View style={localStyles.chipContainer}>
        <Chip
          icon="check"
          style={localStyles.chip}
          onPress={() => addOrPop(entities.jornal)}
          selected={filter.includes(entities.jornal)}
        >
          Jornales
        </Chip>
      </View>
      <View style={localStyles.chipContainer}>
        <Chip
          icon="check"
          style={localStyles.chip}
          onPress={() => addOrPop(entities.pReintegro)}
          selected={filter.includes(entities.pReintegro)}
        >
          Reembolsos
        </Chip>
      </View>
      <View style={localStyles.chipContainer}>
        <Chip
          icon="check"
          style={localStyles.chip}
          onPress={() => addOrPop(entities.pedidoDeObra)}
          selected={filter.includes(entities.pedidoDeObra)}
        >
          Pedidos de Obra
        </Chip>
      </View>
    </View>
  );
};

export default TypesFilter;

const localStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
  },
  chipContainer: {
    margin: 5,
    paddingHorizontal: 5,
  },
  chip: {},
});
