import { StyleSheet } from "react-native";

const colors = {
  B1: "#1984c5",
  B2: "#22a7f0",
  B3: "#63bff0",
  B4: "#a7d5ed",
  neutral: "#e2e2e2",
  R1: "#e1a692",
  R2: "#de6e56",
  R3: "#e14b31",
  R4: "#c23728",
  white: "white",
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flex: 1,
    paddingTop: 30,
    alignItems: "flex-start",
    backgroundColor: "red",
  },
  headerText: { margin: 20 },
  listContainer: {
    flex: 8,
    paddingHorizontal: 20,
  },
  List: {},
  ListItem: {
    padding: 5,
    backgroundColor: colors.neutral,
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
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: "center",
    borderColor: colors.B1,
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: colors.B1,
    fontWeight: "700",
    fontSize: 16,
    padding: 10,
  },
});

export default style;
