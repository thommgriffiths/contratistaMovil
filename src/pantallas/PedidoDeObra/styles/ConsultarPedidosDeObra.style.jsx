import { StyleSheet } from "react-native";
import { palette } from "../../../Core/colors";

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
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: palette.neutral,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: palette.B1,
    borderWidth: 2,
  },

  ListItemText: {},
  ListItemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  ListItemEdit: {
    backgroundColor: palette.B1,
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 5,
  },
  ListItemDelete: {
    backgroundColor: "red",
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 5,
  },
});

export default style;
