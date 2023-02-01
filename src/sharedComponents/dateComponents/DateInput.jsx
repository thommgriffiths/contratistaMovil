import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
//https://github.com/react-native-datetimepicker/datetimepicker

import { fechaComun } from "../../Core/util/functions";
import { palette } from "../../Core/colors";

const DateInput = ({
  placeholder = "Seleccione fecha",
  set = (v) => console.log(v),
  decorator = "",
}) => {
  const defaultDate = new Date(1577929600000);
  const [date, setDate] = useState(defaultDate);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
    if (selectedDate.getTime() != defaultDate.getTime())
      set(selectedDate.getTime());
  };

  return (
    <View>
      <Pressable
        style={styles.wrapper}
        onPress={() => {
          setShow(true);
        }}
      >
        {date.getTime() != defaultDate.getTime() ? (
          <Text style={styles.text}>
            {decorator} {fechaComun(date)}
          </Text>
        ) : (
          <Text style={[styles.text, { color: "grey" }]}>{placeholder}</Text>
        )}
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: palette.B1,
  },
  text: {
    padding: 15,
    fontSize: 16,
  },
});
