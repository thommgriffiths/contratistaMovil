import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import Header from "../sharedComponents/Header";
import Botones from "../sharedComponents/Botones";

import {
  createPedidoReintegro,
  PedidoReintegroConstructor,
} from "../Managers/PedidosReintegroManager";

const PedidoReintegro = () => {
  const [obra, setObra] = useState("");
  const [rubro, setRubro] = useState("");
  const [descripcion, setdescripcion] = useState("");

  const navigation = useNavigation();
  const navigateBack = () => {
    navigation.replace("Home");
  };

  const handleCrearPedido = () => {
    let nuevoPedidoReintegro = PedidoReintegroConstructor(
      obra,
      rubro,
      descripcion
    );

    console.log("pedido creado");
    console.log(nuevoPedidoReintegro);
    createPedidoReintegro(nuevoPedidoReintegro, navigateBack);
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* form container*/}
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Section title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Crear Obra</Text>
            <View style={styles.detailTitleCreate}>
              <TouchableOpacity onPress={() => crearJornal}>
                <MaterialIcons name="update" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <TextInput
              placeholder="Obra del pedido"
              value={obra}
              onChangeText={(text) => {
                setObra(text);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Rubro trabajado"
              value={rubro}
              onChangeText={(text) => setRubro(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Detalle del pedido"
              value={descripcion}
              onChangeText={(text) => {
                setdescripcion(text);
              }}
              style={styles.input}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <Botones
        onOkFunction={handleCrearPedido}
        onOkText={"Crear pedido reintegro"}
        onCancelFunction={navigateBack}
      />
    </View>
  );
};

export default PedidoReintegro;

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

  body: {
    justifyContent: "space-between",
    flex: 1,
  },

  // Form Section

  formWrapper: {
    paddingHorizontal: 20,
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
  detailTitleCreate: {
    width: "20%",
    //flexDirection: 'row',
    //backgroundColor: colors.B1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  input: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: colors.B1,
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
