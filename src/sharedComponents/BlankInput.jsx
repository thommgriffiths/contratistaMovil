import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { palette } from "../assets/colors";

const BlankInput = () => {
  return (
    <View style={styles.input}>
      <Text style={styles.text}>Cargando</Text>
    </View>
  );
};

export default BlankInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: palette.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: palette.B1,
  },
  text: {
    color: "grey",
  },
});
