import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";

import Header from "../../sharedComponents/Header";
import Botones from "../../sharedComponents/Botones";
import SetContextoForm from "../../sharedComponents/SetContextoForm";

import { getCurrentDateTime } from "../../Core/util/functions";
import { obtenerStatus } from "../../Core/util/mockFunctions";
import { getLoggedUser } from "../../Core/util/globalStore";
import DropdownSelect from "../../sharedComponents/DropdownSelect";

import { palette } from "../../assets/colors";

import { createPedidoDeObra } from "../../Managers/EntidadesFinales/PedidoObraManager";

const PedidoObra = ({ navigation }) => {
  const [context, SetContext] = useState({});
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  const handleCrearPedidoObra = () => {
    let nuevoPedidoDeObra = {
      Obra: context.obra,
      Rubro: context.rubro,
      Descripcion: descripcion,
      Fecha: getCurrentDateTime(),
      Status: obtenerStatus().pedido,
      User: getLoggedUser().email,
      TipoDePedido: tipoDePedido,
    };
    console.log("pedido de obra creado");
    console.log(nuevoPedidoDeObra);
    createPedidoDeObra(nuevoPedidoDeObra, () => navigation.navigate("Home"));
  };

  return (
    <View style={styles.container}>
      <Header style={styles.header} />

      {/* form container*/}
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Section title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Crear Pedido de Obra</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <SetContextoForm action={SetContext} />

            {/* formulario especifico */}
            <DropdownSelect
              placeholder="Seleccione tipo de pedido"
              action={setTipoDePedido}
              category="tiposPedidosDePedidosObra"
            />

            <TextInput
              placeholder="Detalle del pedido"
              value={descripcion}
              onChangeText={(text) => {
                setDescripcion(text);
              }}
              style={styles.input}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <Botones
        onOkFunction={handleCrearPedidoObra}
        onOkText={"Crear pedido de obra"}
        onCancelFunction={() => navigation.navigate("Home")}
        style={styles.botonera}
      />
    </View>
  );
};

export default PedidoObra;

const styles = StyleSheet.create({
  //Pantalla
  container: {
    flex: 1,
    backgroundColor: palette.neutral,
  },
  header: {},
  body: {
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  botonera: {},

  // Form Section

  //Form Section - Titulos
  detailTitlesWrapper: {},
  detailTitlesTitle: {
    fontSize: 32,
    color: palette.textDark,
    paddingVertical: 5,
  },

  //Form Section - Cuerpo
  formWrapper: {},
  input: {
    backgroundColor: palette.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: palette.B1,
  },
});
