import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../sharedComponents/Header";

const ArqHomeScreen = () => {
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
          <Text style={styles.titlesSubtitle}>Arquitecto</Text>
          <Text style={styles.titlesTitle}>Menu</Text>
        </View>

        {/*Botonera Menu */}
        <View style={styles.menuWrapper}>
          <Pressable
            onPress={() => navigation.navigate("ValidarJornalesSreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Validar Jornales</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("ArqVerPedidosDeObraScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Pedidos de Obra</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate("ArqVerPedidosDeReintegroScreen")
            }
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Solicitud de Reintegro</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ArqHomeScreen;

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
