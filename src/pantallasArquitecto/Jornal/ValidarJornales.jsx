import { View, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { getLoggedUser } from "../../Core/util/globalStore";
import { updateElement, getCurrentDateTime } from "../../Core/util/functions";
import { commonAttrs, jornalStates } from "../../Core/util/entities";
import { palette } from "../../Core/colors";

const ValidarJornal = ({ item }) => {
  const [selected, setSelected] = useState(null);

  const validateJornal = (newStatus) => {
    const onSuccess = () => {
      setSelected(newStatus);
    };

    let updatedItem = {};
    updatedItem[commonAttrs.id] = item.id;
    updatedItem[commonAttrs.type] = item.type;
    updatedItem[commonAttrs.status] = newStatus;
    updatedItem[commonAttrs.fechaEdicion] = getCurrentDateTime();
    updatedItem[commonAttrs.editadoPor] = getLoggedUser().Email;

    updateElement(updatedItem, onSuccess);
  };

  useEffect(() => {
    setSelected(item?.[commonAttrs.status]);
  }, []);

  return (
    <View style={styles.ListItemActions}>
      <Pressable
        style={[
          styles.itemAction,
          {
            backgroundColor: selected == jornalStates.validated ? "white" : "",
          },
        ]}
        onPress={() => {
          validateJornal(jornalStates.validated);
        }}
      >
        <AntDesign name="checkcircleo" size={24} color="green" />
      </Pressable>
      <Pressable
        onPress={() => {
          validateJornal(jornalStates.inReview);
        }}
        style={[
          styles.itemAction,
          {
            backgroundColor:
              selected == jornalStates.inReview ? palette.B3 : "",
          },
        ]}
      >
        <AntDesign name="questioncircleo" size={24} color="yellow" />
      </Pressable>
      <Pressable
        style={[
          styles.itemAction,
          { backgroundColor: selected == jornalStates.rejected ? "white" : "" },
        ]}
        onPress={() => {
          validateJornal(jornalStates.rejected);
        }}
      >
        <AntDesign name="closecircleo" size={24} color="red" />
      </Pressable>
    </View>
  );
};

export default ValidarJornal;

const styles = StyleSheet.create({
  ListItemActions: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  itemAction: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
