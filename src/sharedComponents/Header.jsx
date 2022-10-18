import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";

const Header = () => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <View style={styles.profileImage}></View>
          <AntDesign name="back" size={24} color="black" />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Header;

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
  headerWrapper: {
    flexDirection: "row",
    backgroundColor: colors.R1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
    paddingBottom: 30,
  },

  profileImage: {
    backgroundColor: colors.B1,
    width: 40,
    height: 40,
    borderRadius: 40,
  },

  body: {
    justifyContent: "space-between",
    flex: 1,
  },
});
