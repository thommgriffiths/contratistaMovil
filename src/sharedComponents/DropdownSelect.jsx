import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { obtenerDropdownItems } from "../Core/util/functions";
import BlankInput from "./BlankInput";
import { palette } from "../Core/colors";

const DropdownSelect = ({ category, placeholder, action, props }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(obtenerDropdownItems(category, setItems));
  }, []);

  useEffect(() => {
    action(value);
  }, [value]);

  return items ? (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        items={items}
        setItems={setItems}
        placeholder={placeholder}
        showTickIcon={false}
        style={styles.input}
        dropDownContainerStyle={styles.dropdown}
        placeholderStyle={styles.placeholderStyles}
        listItemLabelStyle={styles.dropdownListItemLabel}
        selectedItemLabelStyle={styles.dropdownSelectedItemLabel}
        zIndex={props.stackOrder}
      />
    </View>
  ) : (
    <BlankInput />
  );
};

export default DropdownSelect;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: palette.B1,
    height: "100%",
  },
  dropdown: {
    backgroundColor: palette.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: palette.B1,
  },
  placeholderStyles: {
    color: "grey",
  },
  dropdownListItemLabel: {
    color: "grey",
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  dropdownSelectedItemLabel: {
    fontWeight: "bold",
    color: "black",
  },
});
