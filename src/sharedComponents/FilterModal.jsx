import React, { useState } from "react";
import { Text, View, Modal, Pressable, StyleSheet } from "react-native";

import FiltrarPedidoDeObra from "../pantallas/PedidoDeObra/FiltrarPedidoDeObra";
import FiltrarJornales from "../pantallas/Jornal/FiltrarJornal";
import {
  completeElements,
  createQuery as queryBuilder,
} from "../Core/util/functions";
import LoadingComponent from "./LoadingComponent";
import { commonAttrs, entities } from "../Core/util/entities";
import { queryFSElements } from "../Core/Firebase/FirebaseFirestoreManager";
import { getLoggedUser } from "../Core/util/globalStore";

const FilterModal = ({ modalParams, setParams, setElements }) => {
  const Filter = async () => {
    setLoading(true);
    if (modalParams?.item?.filterUser) {
      let query = queryBuilder({
        [commonAttrs.creadoPor]: getLoggedUser().Email,
      });
      searchParams.push(query[0]);
    }
    console.log("search params");
    console.log(searchParams);

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
            <>
              {modalParams.visible &&
                createQuery(modalParams?.item?.[commonAttrs.type])}

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
                  onPress={Filter}
                >
                  <Text style={style.textStyle}>{modalParams.actionLabel}</Text>
                </Pressable>
              </View>
            </>
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

export default FilterModal;
