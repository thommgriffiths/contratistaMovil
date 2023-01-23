import React, { useState } from "react";
import { Text, View, Modal, Pressable, StyleSheet } from "react-native";

import {
  completeElements,
  createQuery as queryBuilder,
} from "../Core/util/functions";
import { commonAttrs, entities } from "../Core/util/entities";
import { queryFSElements } from "../Core/Firebase/FirebaseFirestoreManager";
import { getLoggedUser } from "../Core/util/globalStore";
import { palette } from "../Core/colors";

import LoadingComponent from "./LoadingComponent";
import FiltrarJornales from "../pantallas/Jornal/FiltrarJornal";
import FiltrarPedidoDeObra from "../pantallas/PedidoDeObra/FiltrarPedidoDeObra";

const FilterModal = ({ modalParams, setParams, setElements }) => {
  const Filter = async () => {
    setLoading(true);

    if (modalParams?.item?.filterUser) {
      let query = queryBuilder({
        [commonAttrs.creadoPor]: getLoggedUser().Email,
      });
      searchParams.push(query[0]);
    }

    const rawElements = await queryFSElements(
      modalParams?.item?.[commonAttrs.type],
      searchParams
    );
    const finalElements = await completeElements(rawElements);

    setElements(finalElements);
    setParams({ visible: false });
  };

  const [searchParams, setSearchParams] = useState([]);
  const [loading, setLoading] = useState(false);

  const createQuery = (type) => {
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
            <LoadingComponent />
          ) : (
            <View>
              <View style={{ zIndex: 11000 }}>
                {modalParams.visible &&
                  createQuery(modalParams?.item?.[commonAttrs.type])}
              </View>

              <View style={style.buttonsContainer}>
                <View style={style.buttonWrapper}>
                  <Pressable
                    style={[style.button, style.buttonAction]}
                    onPress={Filter}
                  >
                    <Text style={style.textStyle}>
                      {modalParams.actionLabel}
                    </Text>
                  </Pressable>
                </View>

                <View style={style.buttonWrapper}>
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
  buttonsContainer: {
    flexDirection: "row",
    zIndex: 800,
    alignItems: "spread",
    justifyContent: "space-around",
  },
  buttonWrapper: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "spread",
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    flex: 1,
    alignContent: "center",
  },
  buttonClose: {
    backgroundColor: palette.B1,
  },
  buttonAction: {
    backgroundColor: palette.R4,
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

export default FilterModal;
