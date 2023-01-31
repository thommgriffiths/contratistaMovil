import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

import { palette } from "../Core/colors";

const Botones = ({
  onOkFunction,
  onOkText,
  onCancelFunction,
  onCancelText,
}) => {
  return (
    <View style={styles.botonera}>
      <Pressable onPress={onOkFunction} style={styles.botonOK}>
        <Text style={styles.botonOkText}>{onOkText}</Text>
      </Pressable>

      <Pressable onPress={onCancelFunction} style={styles.botonCancel}>
        <Text style={styles.botonCancelText}>{onCancelText}</Text>
      </Pressable>
    </View>
  );
};

export default Botones;

const styles = StyleSheet.create({
  botonera: {},
  botonOK: {
    backgroundColor: palette.white,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderColor: palette.B1,
    borderWidth: 2,
    marginVertical: 5,
  },
  botonOkText: {
    color: palette.B1,
    fontWeight: "700",
    fontSize: 16,
  },
  botonCancel: {
    backgroundColor: palette.B1,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  botonCancelText: {
    color: palette.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
