import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import LoadingComponent from "../../../sharedComponents/LoadingComponent";
import { updateElement } from "../../../Core/util/functions";
import { commonAttrs } from "../../../Core/util/entities";
import { palette } from "../../../Core/colors";

const ValidateUser = ({ user }) => {
  const [validated, setValidated] = useState(user?.[commonAttrs.validated]);
  const [updating, setUpdating] = useState(false);

  const validate = (newStatus) => {
    if (newStatus == validated) return;

    setUpdating(true);
    setValidated(newStatus);

    let updatedItem = {};
    updatedItem[commonAttrs.id] = user.id;
    updatedItem[commonAttrs.type] = user.type;
    updatedItem[commonAttrs.validated] = newStatus;

    updateElement(updatedItem, () => setUpdating(false));
  };

  return (
    <View style={styles.ListItemActions}>
      {updating ? (
        <LoadingComponent />
      ) : (
        <>
          <Text>Habilitado</Text>
          <View style={styles.actions}>
            <Pressable style={styles.itemAction} onPress={() => validate(true)}>
              <AntDesign
                name={validated ? "checkcircle" : "checkcircleo"}
                size={24}
                color="green"
              />
            </Pressable>

            <Pressable
              style={styles.itemAction}
              onPress={() => validate(false)}
            >
              <AntDesign
                name={!validated ? "closecircle" : "closecircleo"}
                size={24}
                color="red"
              />
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default ValidateUser;

const styles = StyleSheet.create({
  ListItemActions: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: palette.white,
    borderRadius: 40,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemAction: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
