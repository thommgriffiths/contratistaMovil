import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { palette } from "../../Core/colors";

const ModalButtons = ({
  onOkAction,
  onOkText,
  onCancelAction,
  onCancelText,
}) => {
  return (
    <View style={style.container}>
      <Pressable style={style.buttonAction} onPress={onOkAction}>
        <Text style={style.textStyle}>{onOkText}</Text>
      </Pressable>
      <Pressable style={style.buttonClose} onPress={onCancelAction}>
        <Text style={style.textStyle}>{onCancelText}</Text>
      </Pressable>
    </View>
  );
};

export default ModalButtons;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonAction: {
    borderRadius: 20,
    padding: 10,
    paddingVertical: 15,
    elevation: 2,
    marginHorizontal: 10,
    backgroundColor: palette.R3,
    width: "35%",
  },
  buttonClose: {
    borderRadius: 20,
    padding: 10,
    paddingVertical: 15,
    elevation: 2,
    marginHorizontal: 10,
    backgroundColor: palette.B1,
    width: "35%",
  },
  textStyle: {
    color: palette.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
