import React, { useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { parseDate } from "../../Core/util/functions";
import { palette } from "../../Core/colors";

const RangePicker = ({ AddRange = () => {} }) => {
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  const [open, setOpen] = useState(false);

  const onDismiss = () => {
    setOpen(false);
  };

  const onConfirm = ({ startDate, endDate }) => {
    setOpen(false);
    setRange({ startDate, endDate });
    AddRange({
      startDate: startDate?.getTime(),
      endDate: endDate?.getTime(),
    });
  };

  const DateText = () => {
    return range.endDate && range.startDate ? (
      <>
        <Text>Desde: {parseDate(range.startDate)}</Text>
        <Text>Hasta: {parseDate(range.endDate)}</Text>
      </>
    ) : (
      <Text>Filtrar por fechas de creación</Text>
    );
  };

  return (
    <>
      <Pressable style={styles.input} onPress={() => setOpen(true)}>
        <DateText />
      </Pressable>
      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        //   disabledDates: [new Date()] // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        // label="Select period" // optional
        // startLabel="From" // optional
        // endLabel="To" // optional
        // animationType="slide" // optional, default is slide on ios/android and none on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
        // closeIcon="close" // optional, default is "close"
        // editIcon="pencil" // optional, default is "pencil"
        // calendarIcon="calendar" // optional, default is "calendar"
      />
    </>
  );
};

export default RangePicker;

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
});
