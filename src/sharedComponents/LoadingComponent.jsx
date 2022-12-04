import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { palette } from "../Core/colors";

const LoadingComponent = () => {
  const [dots, setDots] = useState("");

  const LoadingText = "Cargando";

  useEffect(() => {
    setTimeout(() => {
      let d = dots;
      d == " . . ." ? (d = "") : (d += " .");
      setDots(d);
    }, 1000);
  }, [dots]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {LoadingText}
        {dots}
      </Text>
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: palette.R4,
  },
});
