import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Botones = ({
  onOkFunction,
  onOkText,
  onCancelFunction,
  onCancelText,
}) => {
  return (
    <View style={styles.botonera}>
      <View style={styles.botonOkWrapper}>
        <TouchableOpacity onPress={onOkFunction} style={styles.botonOK}>
          <Text style={styles.botonOkText}>{onOkText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.botonCancelWrapper}>
        <TouchableOpacity onPress={onCancelFunction} style={styles.botonCancel}>
          <Text style={styles.botonCancelText}>{onCancelText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Botones;

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
  botonera: { flex: 1 },
  botonOkWrapper: { paddingHorizontal: 20, paddingVertical: 10 },
  botonOK: {
    backgroundColor: colors.white,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    borderColor: colors.B1,
    borderWidth: 2,
  },
  botonOkText: {
    color: colors.B1,
    fontWeight: "700",
    fontSize: 16,
  },
  botonCancelWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  botonCancel: {
    backgroundColor: colors.B1,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  botonCancelText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
