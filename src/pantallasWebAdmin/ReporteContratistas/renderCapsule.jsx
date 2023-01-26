import { Text, View, FlatList, StyleSheet } from "react-native";
import React from "react";
import { objectToArray, sumInternalValues } from "../../Core/util/functions";
import styles from "../styles/Consultar.style";
import { palette } from "../../Core/colors";

//Nivel primario
export const renderCapsule = ({ item }) => {
  var localTotal = sumInternalValues(item);
  var titulo = Object.keys(item)[0];
  var subItems = objectToArray(item[titulo]);

  return (
    <View style={localStyles.capsule}>
      <View style={localStyles.capsuleBody}>
        <View style={localStyles.capsuleTitle}>
          <Text style={localStyles.capsuleTitleText}>{titulo}</Text>
          <View style={localStyles.underline}></View>
        </View>
        <View style={localStyles.capsuleData}>
          <FlatList
            data={subItems}
            renderItem={renderSecondary}
            keyExtractor={(item) => Object.keys(item)[0]}
            style={styles.List}
          />
        </View>
      </View>
      <View style={localStyles.capsuleNumber}>
        <Text style={localStyles.capsuleNumberText}>TOTAL</Text>
        <Text style={localStyles.capsuleNumberText}>{localTotal}</Text>
      </View>
    </View>
  );
};

//Nivel secundario
const renderSecondary = ({ item }) => {
  var localTotal = sumInternalValues(item);
  var titulo = Object.keys(item)[0];
  var subItems = objectToArray(item[titulo]);

  return (
    <>
      <View style={localStyles.innercontainer}>
        <View style={localStyles.innerdata}>
          <Text style={localStyles.innertitle}>{titulo}</Text>
          <FlatList
            data={subItems}
            renderItem={renderTertiary}
            keyExtractor={(item) => Object.keys(item)[0]}
            style={localStyles.innerList}
          />
        </View>
        <View style={localStyles.innercapsuleNumber}>
          <Text style={localStyles.innercapsuleNumberText}>TOTAL</Text>
          <Text style={localStyles.innercapsuleNumberText}>{localTotal}</Text>
        </View>
      </View>
    </>
  );
};

//Nivel terciario
const renderTertiary = ({ item }) => {
  let label = Object.keys(item)[0];
  return (
    <View style={localStyles.innerSubcontainer}>
      <Text style={localStyles.innerSubtext}>
        - {label}: {item[label]}
      </Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
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
  },
  capsuleNumber: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  capsuleTitle: {},
  capsuleTitleText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 25,
  },
  underline: {
    backgroundColor: "black",
    height: 1,
  },
  capsuleData: {},
  capsuleNumberText: {
    fontWeight: "bold",
    fontSize: 35,
  },
  innercontainer: {
    backgroundColor: palette.white,
    borderRadius: 10,
    borderColor: palette.B2,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    flexDirection: "row",
  },
  innertitle: {
    fontWeight: "bold",
  },
  innerdata: {
    flex: 1,
  },
  innerList: {
    paddingHorizontal: 10,
  },
  innerSubcontainer: {},
  innerSubtext: {},
  innercapsuleNumber: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innercapsuleNumberText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
