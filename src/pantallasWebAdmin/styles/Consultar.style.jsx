import { StyleSheet } from "react-native";
import { palette } from "../../Core/colors";

const styles = StyleSheet.create({
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  actionsAdd: {
    backgroundColor: palette.B3,
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  actionsAddText: {
    color: palette.white,
    fontSize: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  actionsFilter: {
    backgroundColor: palette.R3,
    height: 50,
    borderRadius: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },

  actionsFilterText: {
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
  ListItemAction: {
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.white,
    borderRadius: 40,
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
  shortInfo: {
    paddingHorizontal: 5,
  },
  strongText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default styles;
