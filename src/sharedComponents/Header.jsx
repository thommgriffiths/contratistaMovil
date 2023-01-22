import { StyleSheet, View, SafeAreaView, Pressable } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { palette } from "../Core/colors";

const Header = ({ backButton, backTo }) => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <View style={styles.profileImage}></View>
          {backButton ? (
            <Pressable
              style={styles.iconWrapper}
              onPress={() => navigation.navigate("Home")}
            >
              <AntDesign name="back" size={24} color="black" />
            </Pressable>
          ) : (
            <></>
          )}
          {backTo ? (
            <Pressable onPress={() => navigation.navigate(backTo)}>
              <AntDesign name="back" size={24} color="black" />
            </Pressable>
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
    backgroundColor: palette.B4,
    width: 40,
    height: 40,
    borderRadius: 40,
  },

  iconWrapper: {
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.R3,
    borderRadius: 40,
  },
});
