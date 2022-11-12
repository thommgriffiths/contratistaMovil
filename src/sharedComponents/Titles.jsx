import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Titles = ({ titleText = null, subTitleText = null }) => {
  return (
    <View style={styles.titlesWrapper}>
      {titleText ? (
        <Text style={styles.titlesSubtitle}>{titleText}</Text>
      ) : (
        <></>
      )}
      {subTitleText ? (
        <Text style={styles.titlesTitle}>{subTitleText}</Text>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Titles;

const styles = StyleSheet.create({
  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titlesSubtitle: {
    fontSize: 16,
  },
  titlesTitle: {
    fontSize: 32,
    marginTop: 5,
  },
});
