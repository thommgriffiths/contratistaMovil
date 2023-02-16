import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../sharedComponents/Header";

const ContratistaHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
          <Pressable
            onPress={() => navigation.navigate("ContraVerJornalesScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Ver y cargar jornales</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate("ContraVerPedidosDeReintegroScreen")
            }
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Pedir reintegro adicionales</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContratistaHomeScreen;

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
