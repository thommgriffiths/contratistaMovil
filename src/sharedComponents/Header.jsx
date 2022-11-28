import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { palette } from "../Core/colors";

const Header = ({ backButton }) => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <View style={styles.profileImage}></View>
          {backButton ? (
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    backgroundColor: palette.R1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
    paddingBottom: 30,
  },

  profileImage: {
    backgroundColor: palette.B1,
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
