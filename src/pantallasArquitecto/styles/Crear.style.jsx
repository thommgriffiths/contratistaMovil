import { StyleSheet } from "react-native";
import { palette } from "../../Core/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    borderColor: "blue",
    borderWidth: 2,
  },

  //container
  headerWrapper: {},
  body: {
    flex: 1,
    alignContent: "stretch",
    paddingHorizontal: 20,
    backgroundColor: palette.white,
    borderColor: "green",
    borderWidth: 2,
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
    marginTop: 10,
    paddingHorizontal: 5,
    justifyContent: "center",
    backgroundColor: palette.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: palette.B1,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default styles;
