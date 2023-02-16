import { StyleSheet } from "react-native";
import { palette } from "../../Core/colors";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  modalView: {
    backgroundColor: palette.white,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrolllView: {
    margin: 10,
    flexGrow: 0,
  },
  scrolllViewContentContainer: {},

  body: {},

  //body
  titlesWrapper: {},
  formWrapper: {},

  //titlesWrapper
  titlesText: {
    fontSize: 32,
    color: palette.textDark,
    paddingVertical: 5,
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

  buttonsWrapper: {
    alignSelf: "center",
    width: "80%",
    marginTop: 10,
    marginBottom: 5,
  },

  // cosas viejas
  button: {
    backgroundColor: "#0782F9",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  text: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 20,
  },
});

export default styles;
