import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../sharedComponents/Header";

const AdminMenuTareas = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header backTo="AdminHomeScreen" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {/*titulos*/}
        <View style={styles.titlesWrapper}>
          <Text style={styles.titlesSubtitle}>Administrador</Text>
          <Text style={styles.titlesTitle}>Gestion Pedidos</Text>
        </View>

        {/*Botonera Menu */}
        <View style={styles.menuWrapper}>
          <Pressable
            onPress={() => navigation.navigate("AdminPedidosDeReintegroScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Gestion Reembolsos</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate("AdminPedidosDeObraYMaterialesScreen")
            }
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Gestion Pedidos de Obra</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminMenuTareas;

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
