import { StyleSheet } from "react-native";
import { palette } from "../../assets/colors";

const style = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
  },
  body: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listContainer: {},

  List: {},
  ListItem: {
    padding: 5,
    backgroundColor: palette.neutral,
    marginVertical: 5,
    borderRadius: 10,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: palette.white,
    borderRadius: 10,
    alignItems: "center",
    borderColor: palette.B1,
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: palette.B1,
    fontWeight: "700",
    fontSize: 16,
    padding: 10,
  },
});

export default style;
