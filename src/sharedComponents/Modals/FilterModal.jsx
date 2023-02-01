import React, { useState } from "react";
import { View, Modal, ScrollView, StyleSheet } from "react-native";

import { completeElements, createQuery } from "../../Core/util/functions";
import { commonAttrs, entities } from "../../Core/util/entities";
import { queryFSElements } from "../../Core/Firebase/FirebaseFirestoreManager";
import { getLoggedUser } from "../../Core/util/globalStore";
import { palette } from "../../Core/colors";

import FiltrarJornales from "../../sharedScreens/Jornal/FiltrarJornal";
import FiltrarPedidoDeObra from "../../sharedScreens/PedidoDeObra/FiltrarPedidoDeObra";
import LoadingComponent from "../LoadingComponent";
import ModalButtons from "./ModalButtons";

const FilterModal = ({ modalParams, setParams, setElements }) => {
  const [searchParams, setSearchParams] = useState([]);
  const [loading, setLoading] = useState(false);

  const Filter = async () => {
    setLoading(true);

    if (modalParams?.item?.filterUser) {
      let query = createQuery({
        [commonAttrs.creadoPor]: getLoggedUser().Email,
      });
      searchParams.push(query[0]);
    }

    const rawElements = await queryFSElements(
      modalParams?.item?.[commonAttrs.type],
      searchParams
    );
    const completedElements = await completeElements(rawElements);

    setElements(completedElements);
    setParams({ visible: false });
  };

  const switchFilter = (type) => {
    switch (type) {
      case entities.pedidoDeObra:
        return <FiltrarPedidoDeObra setSearchParams={setSearchParams} />;
      case entities.jornal:
        return <FiltrarJornales setSearchParams={setSearchParams} />;
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
          {loading ? (
            <View style={style.loadingContainer}>
              <LoadingComponent />
            </View>
          ) : (
            <ScrollView
              style={style.scrolllView}
              contentContainerStyle={style.scrolllViewContentContainer}
            >
              <View style={style.formContainer}>
                {modalParams.visible &&
                  switchFilter(modalParams?.item?.[commonAttrs.type])}
              </View>

              <View style={style.buttonsWrapper}>
                <ModalButtons
                  onOkAction={Filter}
                  onOkText={modalParams.actionLabel}
                  onCancelAction={() => {
                    setParams({ ...modalParams, visible: false });
                  }}
                  onCancelText="Cancelar"
                />
              </View>
            </ScrollView>
          )}
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
  loadingContainer: {},
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

export default FilterModal;
