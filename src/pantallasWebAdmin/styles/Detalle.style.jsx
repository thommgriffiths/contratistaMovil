import { StyleSheet } from "react-native";
import { palette } from "../../Core/colors";

const styles = StyleSheet.create({
  component: {
    marginBottom: 10,
  },
  propertyContainer: {},
  label: {
    fontWeight: "bold",
  },
  content: {},
  separator: {
    backgroundColor: palette.B2,
    height: 1,
    marginVertical: 3,
  },
  List: {
    flexGrow: 0,
  },
});

export default styles;
