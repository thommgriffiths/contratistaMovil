import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

import Header from "../../sharedComponents/Header";

const MenuAdministracionSistema = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header backTo="AdminHomeScreen" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {/*titulos*/}
        <View style={styles.titlesWrapper}>
          <Text style={styles.titlesTitle}>Gestion de Sistema</Text>
        </View>

        {/*Botonera Menu */}
        <View style={styles.menuWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AdminVerObrasScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Gestionar Obras</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AdminVerRubrosScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Gestionar Rubros</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AdminVerUsuariosScreen")}
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>Gestionar Usuarios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuAdministracionSistema;

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
