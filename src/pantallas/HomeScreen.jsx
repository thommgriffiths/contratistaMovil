import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import Header from "../sharedComponents/Header";
import { palette } from "../assets/colors";
import { userSignOut } from "../Managers/Firebase/FirebaseAuthManager";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
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
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},

  //Titulos
  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titlesSubtitle: {
    fontSize: 16,
  },
  titlesTitle: {
    fontSize: 32,
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
