import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import Globalstyles from "../../assets/globalStyle";
import {
  newObra,
  createObra,
  obraConstructor,
  getAllObras,
  deleteObra,
} from "../../Managers/DatosMaestros/ObraManager";
import { TestUpdateScreen } from "./TestUpdateScreen";

const ObraDetailScreen = ({ route, navigation }) => {
  const { id, Nombre, Propietario, Direccion } = route.params;

  const handleUpdate = () => {
    /*
        setItemToUpdate(item);
        navigation.navigate('TestUpdateScreen',item)*/
  };

  const handleDelete = (id) => {
    console.log("elemento a eliminar: " + id);
    deleteObra(id, navigateBack);
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/*Header*/}
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <View style={styles.profileImage}></View>
          <AntDesign name="back" size={24} color="black" />
        </View>
      </SafeAreaView>

      {/*Detail title*/}
      <View style={styles.detailTitlesWrapper}>
        <Text style={styles.detailTitlesTitle}>Detalle Obra</Text>
        <View style={styles.detailTitlesActions}>
          <TouchableOpacity
            style={styles.detailItemModify}
            onPress={() => {
              handleUpdate();
            }}
          >
            <MaterialIcons name="update" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailItemDelete}
            onPress={() => {
              handleDelete(id);
            }}
          >
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      {/*Element Detail*/}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={styles.itemContainer}
      >
        <View style={styles.itemDetail}>
          <View style={styles.itemDetailInfo}>
            <Text style={styles.itemDetailInfoText}>Nombre obra: {Nombre}</Text>
            <Text style={styles.itemDetailInfoText}>
              Propietario obra: {Propietario}
            </Text>
            <Text style={styles.itemDetailInfoText}>
              Direccion obra: {Direccion}
            </Text>
            <Text style={styles.itemDetailInfoText}>id: {id}</Text>
          </View>
        </View>
      </ScrollView>

      {/*Back button */}
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ObraDetailScreen;

const colors = {
  B1: "#1984c5",
  B2: "#22a7f0",
  B3: "#63bff0",
  B4: "#a7d5ed",
  neutral: "#e2e2e2",
  R1: "#e1a692",
  R2: "#de6e56",
  R3: "#e14b31",
  R4: "#c23728",
  white: "white",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral,
    //justifyContent: 'center',
    //alignItems: 'center'
  },

  //HEader
  headerWrapper: {
    flexDirection: "row",
    backgroundColor: colors.R1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
    paddingBottom: 30,
  },

  profileImage: {
    backgroundColor: colors.B1,
    width: 40,
    height: 40,
    borderRadius: 40,
  },

  //Detail title
  detailTitlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailTitlesTitle: {
    //fontFamily: 'MBold',
    fontSize: 32,
    color: colors.textDark,
    marginTop: 5,
  },
  detailTitlesActions: {
    width: "30%",
    flexDirection: "row",
    //backgroundColor: colors.B1,
  },
  detailItemModify: {
    width: "50%",
    alignItems: "flex-end",
  },
  detailItemDelete: {
    width: "50%",
    alignItems: "flex-end",
  },

  //Detail
  itemContainer: {
    paddingHorizontal: 20,
  },

  itemDetail: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: colors.B1,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  itemDetailInfo: {
    //width: '70%',
  },
  itemDetailInfoText: {
    paddingVertical: 10,
    fontSize: 20,
    color: colors.textDark,
  },

  //Back button
  backButtonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    backgroundColor: colors.B1,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
