import React, { useState } from "react";
import { Text, View, Modal, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { userSignOut } from "../../Core/Firebase/FirebaseAuthManager";
import { palette } from "../../Core/colors";

import ModalButtons from "../../sharedComponents/Modals/ModalButtons";
import LoadingComponent from "../../sharedComponents/LoadingComponent";

const LogOutModal = ({ open, setOpen }) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleLogOut = () => {
    setLoading(true);
    userSignOut(() => navigation.replace("Login"));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>
          <ScrollView
            style={style.scrolllView}
            contentContainerStyle={style.scrolllViewContentContainer}
          >
            {loading ? (
              <View style={style.loadingContainer}>
                <LoadingComponent />
              </View>
            ) : (
              <>
                <View style={style.formContainer}>
                  <Text style={style.modalText}>
                    Esta seguro que desea cerrar sesion?
                  </Text>
                </View>

                <View style={style.buttonsWrapper}>
                  <ModalButtons
                    onOkAction={handleLogOut}
                    onOkText="Si, cerrar"
                    onCancelAction={() => {
                      setOpen(false);
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

export default LogOutModal;

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
    marginVertical: 10,
    paddingBottom: 5,
  },
  modalText: {
    marginVertical: 15,
    textAlign: "center",
  },
});
