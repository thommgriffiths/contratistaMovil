import {
  Text,
  View,
  Modal,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { palette } from "../Core/colors";
import { commonAttrs, entities } from "../Core/util/entities";

const SortingModal = ({
  modalParams,
  setParams,
  setSortingParams,
  sortingVariables,
}) => {
  const renderItem = ({ item }) => {
    return (
      <View style={style.ListItem}>
        <Text>{item}</Text>
        <View style={style.order}>
          <Pressable
            style={{ ...style.choose, backgroundColor: palette.B3 }}
            onPress={() => {
              setSortingParams({
                attr: item,
                asc: true,
              });
              setParams({ visible: false, actionLabel: "Sort" });
            }}
          >
            <Text style={style.orderText}>Asc</Text>
          </Pressable>
          <Pressable
            style={{ ...style.choose, backgroundColor: palette.R3 }}
            onPress={() => {
              setSortingParams({
                attr: item,
                asc: false,
              });
              setParams({ visible: false, actionLabel: "Sort" });
            }}
          >
            <Text style={style.orderText}>Des</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalParams.visible}
      onRequestClose={() => {
        setParams({ ...modalParams, visible: false });
      }}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>
          <Text style={style.modalText}>
            Esta seguro que desea {modalParams.actionLabel} este elemento?
          </Text>
          <FlatList
            data={sortingVariables}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonDelete: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
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
  choose: {
    width: 30,
    height: 30,
    borderRadius: 30,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  order: {
    flexDirection: "row",
    marginLeft: 8,
  },
  orderText: {
    marginHorizontal: 4,
  },
});

export default SortingModal;
