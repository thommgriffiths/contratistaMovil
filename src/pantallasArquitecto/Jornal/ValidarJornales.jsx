import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
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
    updatedItem[commonAttrs.jornalState] = newStatus;
    updatedItem[commonAttrs.fechaEdicion] = getCurrentDateTime();
    updatedItem[commonAttrs.editadoPor] = getLoggedUser().Email;

    updateElement(updatedItem, onSuccess);
  };

  useEffect(() => {
    setSelected(item?.[commonAttrs.jornalState]);
  }, []);

  return (
    <View style={styles.ListItemActions}>
      <Pressable
        style={styles.itemAction}
        onPress={() => {
          validateJornal(jornalStates.validated);
        }}
      >
        <AntDesign
          name={
            selected == jornalStates.validated ? "checkcircle" : "checkcircleo"
          }
          size={24}
          color="green"
        />
      </Pressable>
      <Pressable
        style={styles.itemAction}
        onPress={() => {
          validateJornal(jornalStates.inReview);
        }}
      >
        <AntDesign
          name={
            selected == jornalStates.inReview
              ? "exclamationcircle"
              : "exclamationcircleo"
          }
          size={24}
          color="grey"
        />
      </Pressable>
      <Pressable
        style={styles.itemAction}
        onPress={() => {
          validateJornal(jornalStates.rejected);
        }}
      >
        <AntDesign
          name={
            selected == jornalStates.rejected ? "closecircle" : "closecircleo"
          }
          size={24}
          color="red"
        />
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
    marginVertical: 5,
    backgroundColor: palette.white,
    borderRadius: 10,
  },
  itemAction: {
    padding: 5,
    margin: 5,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
