import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Titles = ({ titleText = null, subTitleText = null }) => {
  return (
    <View style={styles.titlesWrapper}>
      {subTitleText ? (
        <Text style={styles.titlesSubtitle}>{subTitleText}</Text>
      ) : (
        <></>
      )}
      {titleText ? <Text style={styles.titlesTitle}>{titleText}</Text> : <></>}
    </View>
  );
};

export default Titles;

const styles = StyleSheet.create({
  titlesWrapper: {
    marginTop: 30,
    marginBottom: 15,
  },
  titlesSubtitle: {
    fontSize: 16,
  },
  titlesTitle: {
    fontSize: 32,
    marginTop: 5,
  },
});
