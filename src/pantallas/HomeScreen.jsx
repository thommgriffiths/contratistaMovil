import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { userSignOut } from "../Managers/Firebase/FirebaseAuthManager";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {/*Header*/}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <View style={styles.profileImage}></View>
            <AntDesign name="back" size={24} color="black" />
          </View>
        </SafeAreaView>

        {/*titulos*/}
        <View style={styles.titlesWrapper}>
          <Text style={styles.titlesSubtitle}>Contratista</Text>
          <Text style={styles.titlesTitle}>Menu</Text>
        </View>

        {/*Botonera Menu */}
        <View style={styles.menuWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CrearJornalScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Crear Jornal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("PedidoReintegroScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Pedido Reintegro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("PedidoDeObraScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Pedido de Obra</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("CrearObraScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Crear Obra</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("CrearRubroScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Crear Rubro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ListarObrasScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Ver Obras</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}></View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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
  },

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

  //Titulos

  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titlesSubtitle: {
    //fontFamily: 'MRegular',
    fontSize: 16,
    color: colors.textDark,
  },
  titlesTitle: {
    //fontFamily: 'MBold',
    fontSize: 32,
    color: colors.textDark,
    marginTop: 5,
  },

  //Menu container
  menuWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  menuItem: {
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderWidth: 2,
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },

  menuItemText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
