import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { palette } from "../Core/colors";
//https://github.com/react-native-picker/picker

import {
  pickerPrepareLocal,
  pickerPrepareRemote,
} from "../Core/util/functions";

import BlankInput from "./BlankInput";

const DropDownSelectMobile = ({
  options = {},
  set = () => {},
  remote,
  defaultValue,
  placeholder,
}) => {
  const [loading, setLoading] = useState(remote);
  const [elements, setElements] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (remote) {
      pickerPrepareRemote(options, placeholder, defaultValue).then((result) => {
        setElements(result);
        setLoading(false);
      });
    } else {
      setElements(pickerPrepareLocal(options, placeholder, defaultValue));
    }
  }, []);

  return loading ? (
    <BlankInput />
  ) : (
    <View style={styles.wrapper}>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedItem(itemValue);
          set(itemValue);
        }}
      >
        {elements.map((item) => (
          <Picker.Item
            label={item.label}
            value={item.value}
            key={item.value}
            color={item.color}
          />
        ))}
      </Picker>
    </View>
  );
};

export default DropDownSelectMobile;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    backgroundColor: palette.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: palette.B1,
  },
});
