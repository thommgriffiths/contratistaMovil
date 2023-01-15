import { View, StyleSheet } from "react-native";
import React from "react";
import { Chip } from "react-native-paper";
import { userTypes } from "../../../Core/util/entities";

const Filter = ({ action, filter }) => {
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
          onPress={() => addOrPop(userTypes.admin)}
          selected={filter.includes(userTypes.admin)}
        >
          {userTypes.admin}
        </Chip>
      </View>
      <View style={localStyles.chipContainer}>
        <Chip
          icon="check"
          onPress={() => addOrPop(userTypes.architect)}
          selected={filter.includes(userTypes.architect)}
        >
          {userTypes.architect}
        </Chip>
      </View>
      <View style={localStyles.chipContainer}>
        <Chip
          icon="check"
          onPress={() => addOrPop(userTypes.contractor)}
          selected={filter.includes(userTypes.contractor)}
        >
          {userTypes.contractor}
        </Chip>
      </View>
    </View>
  );
};

export default Filter;

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
});
