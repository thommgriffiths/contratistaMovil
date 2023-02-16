import React, { useState } from "react";
import { View, Modal, ScrollView, StyleSheet } from "react-native";

import { updateElement } from "../../Core/util/functions";
import { entities } from "../../Core/util/entities";
import { palette } from "../../Core/colors";

import EditarPedidoDeObra from "../../sharedScreens/PedidoDeObra/EditarPedidoDeObra";
import EditarJornal from "../../sharedScreens/Jornal/EditarJornal";
import EditarPedidoDeReintegro from "../../sharedScreens/PedidoDeReintegro/EditarPedidoDeReintegro";
import EditarObra from "../../sharedScreens/Obra/EditarObra";
import EditarRubro from "../../sharedScreens/Rubro/EditarRubro";
import LoadingComponent from "../LoadingComponent";
import ModalButtons from "./ModalButtons";

const EditModal = ({ modalParams, setParams }) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  const onEdit = () => {
    setLoading(true);
    const onSuccess = () => {
      setParams({ visible: false, editedItem: modalParams.item.id });
    };
    updateElement(item, onSuccess);
  };

  const editItem = (type) => {
    switch (type) {
      case entities.pedidoDeObra:
        return (
          <EditarPedidoDeObra
            currentItem={modalParams.item}
            setNewItem={setItem}
          />
        );

      case entities.pReintegro:
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
          <ScrollView
            style={style.scrolllView}
            contentContainerStyle={style.scrolllViewContentContainer}
          >
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <View style={style.formContainer}>
                  {modalParams.visible &&
                    Object.keys(modalParams.item).length != 0 &&
                    editItem(modalParams.item.type)}
                </View>

                <View style={style.buttonsWrapper}>
                  <ModalButtons
                    onOkAction={onEdit}
                    onOkText="Editar"
                    onCancelAction={() => {
                      setParams({ ...modalParams, visible: false });
                    }}
                    onCancelText="Cancelar"
                  />
                </View>
              </>
            )}
          </ScrollView>
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
    margin: 10,
  },
  modalView: {
    backgroundColor: palette.white,
    borderRadius: 20,
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
  scrolllView: {
    margin: 10,
    flexGrow: 0,
  },
  scrolllViewContentContainer: {},
  formContainer: {},
  buttonsWrapper: {
    marginTop: 10,
    marginBottom: 5,
  },
});

export default EditModal;
