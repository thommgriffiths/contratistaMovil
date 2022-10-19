import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import Globalstyles from "../../assets/globalStyle";
import {
  createObra,
  obraConstructor,
} from "../../Managers/DatosMaestros/ObraManager";

const TestCrearObra = () => {
  const navigation = useNavigation();

  //Hooks
  const [nombreObra, setNombreObra] = useState("");
  const [propietarioObra, setPropietarioObra] = useState("");
  const [direccionObra, setDireccionObra] = useState("");

  const [obra, setObra] = useState(null);
  /*
    useEffect(() => {
    }, [])*/

  const crearObra = () => {
    //validar que este todo lleno
    let newObra = obraConstructor(nombreObra, direccionObra, propietarioObra);
    setObra(newObra);
    console.log(newObra);

    createObra(newObra, navigateBack);
  };

  const navigateBack = () => {
    navigation.replace("Home");
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

      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Section title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Crear Obra</Text>
            <View style={styles.detailTitleCreate}>
              <TouchableOpacity
                onPress={() => {
                  handleUpdate();
                }}
              >
                <MaterialIcons name="update" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <TextInput
              placeholder="Nombre Nueva Obra"
              value={nombreObra}
              onChangeText={(text) => setNombreObra(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Propietario Obra"
              value={propietarioObra}
              onChangeText={(text) => setPropietarioObra(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Direccion Obra"
              value={direccionObra}
              onChangeText={(text) => setDireccionObra(text)}
              style={styles.input}
            />
          </View>
        </KeyboardAvoidingView>

        {/*Back button */}
        <View style={styles.backButtonWrapper}>
          <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TestCrearObra;

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
