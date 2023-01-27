import { StyleSheet } from "react-native";
import { palette } from "../../Core/colors";

const styles = StyleSheet.create({
  //Pantalla
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
  header: {},
  body: {
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    zIndex: 100000,
  },
  botonera: {},

  // Form Section

  //Form Section - Titulos
  detailTitlesWrapper: {},
  detailTitlesTitle: {
    fontSize: 32,
    color: palette.textDark,
    paddingVertical: 5,
  },

  //Form Section - Cuerpo
  formWrapper: {},
  buttonsWrapper: {
    zIndex: 50,
    width: "70%",
    alignSelf: "center",
  },
  input: {
    backgroundColor: palette.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: palette.B1,
  },
  buttonsWrapper: {
    width: "70%",
    alignSelf: "center",
    zIndex: 1,
  },
});

export default styles;
