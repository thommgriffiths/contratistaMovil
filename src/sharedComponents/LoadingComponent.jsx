import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { palette } from "../Core/colors";

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={palette.R4} />
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    margin: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
