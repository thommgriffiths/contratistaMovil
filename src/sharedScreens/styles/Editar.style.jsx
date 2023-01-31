import { StyleSheet } from "react-native";
import { palette } from "../../Core/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
  },

  //container
  titlesWrapper: {},
  formWrapper: {},

  //titlesWrapper
  titlesText: {
    fontSize: 32,
    color: palette.textDark,
    paddingVertical: 5,
  },

  //formWrapper
  fieldTitle: {
    marginTop: 10,
  },
  inputWrapper: {
    marginVertical: 5,
    justifyContent: "center",
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: palette.B1,
  },
});

export default styles;
