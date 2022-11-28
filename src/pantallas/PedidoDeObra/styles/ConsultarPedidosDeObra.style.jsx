import { StyleSheet } from "react-native";
import { palette } from "../../../Core/colors";

const style = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  titlesAndActions: { flexDirection: "row", justifyContent: "space-between" },
  actions: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  actionsAdd: {
    backgroundColor: palette.B3,
    //width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  actionsAddText: {
    color: palette.white,
    fontSize: 35,
    justifyContent: "center",
    alignItems: "center",
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

  ListItemText: { flex: 1 },
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
