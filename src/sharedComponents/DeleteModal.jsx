import { Text, View, Modal, Pressable, StyleSheet } from "react-native";
import { deleteElement } from "../Core/util/functions";

const DeleteModal = ({ modalParams, setParams }) => {
  const onDeleteSuccess = () => {
    setParams({ visible: false, deletedItem: modalParams.item.id });
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
          <View style={style.buttonContainer}>
            <Pressable
              style={[style.button, style.buttonDelete]}
              onPress={() => {
                deleteElement(modalParams.item, onDeleteSuccess);
              }}
            >
              <Text style={style.textStyle}>{modalParams.actionLabel}</Text>
            </Pressable>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => {
                setParams({ ...modalParams, visible: false });
              }}
            >
              <Text style={style.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
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
});

export default DeleteModal;
