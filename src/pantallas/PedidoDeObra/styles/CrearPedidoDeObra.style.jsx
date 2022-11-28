import { StyleSheet } from "react-native";
import { palette } from "../../../Core/colors";

const styles = StyleSheet.create({
  //Pantalla
  container: {
    flex: 1,
    backgroundColor: palette.neutral,
  },
  header: {},
  body: {
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
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

export default styles;
