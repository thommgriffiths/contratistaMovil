import { StyleSheet } from "react-native";
import { palette } from "../../Core/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },

  //container
  headerWrapper: {},
  body: {
    flex: 1,
    alignContent: "stretch",
    paddingHorizontal: 20,
  },
  bodyContentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },

  //body
  bodytop: { flex: 1, justifyContent: "flex-start" },
  bodybottom: { flex: 1, justifyContent: "flex-end" },

  //bodytop
  titlesWrapper: {},
  formWrapper: {},

  //bodybottom
  buttonsWrapper: {
    alignSelf: "center",
  },

  //titlesWrapper
  titlesText: {
    fontSize: 32,
    color: palette.textDark,
    paddingVertical: 5,
  },

  //formWrapper
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
