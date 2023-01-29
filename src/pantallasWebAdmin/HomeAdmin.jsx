import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../sharedComponents/Header";

const AdminHome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header backButton />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {/*titulos*/}
        <View style={styles.titlesWrapper}>
          <Text style={styles.titlesSubtitle}>Administrador</Text>
          <Text style={styles.titlesTitle}>Menu</Text>
        </View>

        {/*Botonera Menu */}
        <View style={styles.menuWrapper}>
          <Pressable
            onPress={() => navigation.navigate("AdminReporteRapidoScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Reporte Rapido Contratistas</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("AdminMenuTareasScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Gestionar Pedidos</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("AdminEstadosObraScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Ultimos Movimientos Obra</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("MenuAdministracionScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Administracion del Sistema</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

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
