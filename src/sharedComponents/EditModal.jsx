import React, { useState } from "react";
import { Text, View, Modal, Pressable, StyleSheet } from "react-native";

import EditarPedidoDeObra from "../pantallas/PedidoDeObra/EditarPedidoDeObra";
import EditarJornal from "../pantallas/Jornal/EditarJornal";
import EditarPedidoDeReintegro from "../pantallas/PedidoDeReintegro/EditarPedidoDeReintegro";
import EditarObra from "../pantallas/Obra/EditarObra";
import EditarRubro from "../pantallas/Rubro/EditarRubro";
import { updateElement, cleanElement } from "../Core/util/functions";
import { entities } from "../Core/util/entities";

const EditModal = ({ modalParams, setParams }) => {
  const onEdit = () => {
    const onSuccess = () => {
      setParams({ visible: false, editedItem: modalParams.item.id });
    };
    const finalItem = cleanElement(item);
    console.log("el nuevo elemento editado es: ");
    console.log(finalItem);
    updateElement(finalItem, onSuccess);
  };

  const [item, setItem] = useState({});

  const editItem = (type) => {
    switch (type) {
      case entities.pedidoDeObra:
        return (
          <EditarPedidoDeObra
            currentItem={modalParams.item}
            setNewItem={setItem}
          />
        );

      case entities.pedidoDeReintegro:
        return (
          <EditarPedidoDeReintegro
            currentItem={modalParams.item}
            setNewItem={setItem}
          />
        );
      case entities.jornal:
        return (
          <EditarJornal currentItem={modalParams.item} setNewItem={setItem} />
        );
      case entities.obra:
        return (
          <EditarObra currentItem={modalParams.item} setNewItem={setItem} />
        );

      case entities.rubro:
        return (
          <EditarRubro currentItem={modalParams.item} setNewItem={setItem} />
        );
      default:
        console.log("No se encontro la categoria" + type);
        setParams({ ...modalParams, visible: false });
        return false;
    }
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
          {modalParams.visible &&
            Object.keys(modalParams.item).length != 0 &&
            editItem(modalParams.item.type)}

          <View style={style.buttonContainer}>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => {
                setParams({ ...modalParams, visible: false });
              }}
            >
              <Text style={style.textStyle}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[style.button, style.buttonDelete]}
              onPress={onEdit}
            >
              <Text style={style.textStyle}>{modalParams.actionLabel}</Text>
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

export default EditModal;
