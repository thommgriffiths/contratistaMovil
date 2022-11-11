import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { obtenerDropdownItems } from "../Core/util/mockFunctions";
import { palette } from "../assets/colors";

const DropdownSelect = ({
  category,
  placeholder = "Seleccione",
  action = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(obtenerDropdownItems(category));
  }, []);

  useEffect(() => {
    action(value);
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      items={items}
      setItems={setItems}
      placeholder={placeholder}
      showTickIcon={false}
      style={[styles.input, styles.inputDropdown]}
      dropDownContainerStyle={styles.dropdown}
      placeholderStyle={styles.placeholderStyles}
      listItemLabelStyle={styles.dropdownListItemLabel}
      selectedItemLabelStyle={styles.dropdownSelectedItemLabel}
    />
  );
};

export default DropdownSelect;

const styles = StyleSheet.create({
  input: {
    backgroundColor: palette.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: palette.B1,
  },
  inputDropdown: {
    flexDirection: "row",
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
