import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";

import SetContextoForm from "../../sharedComponents/SetContextoForm";
import DropdownSelect from "../../sharedComponents/DropdownSelect";
import { getCurrentDateTime, fuseItems } from "../../Core/util/functions";
import { obtenerStatus } from "../../Core/util/mockFunctions";
import { getLoggedUser } from "../../Core/util/globalStore";
import { entities } from "../../Core/types";
import { palette } from "../../assets/colors";

const EditPedidoObra = ({ currentItem, setNewItem }) => {
  const [context, setContext] = useState(null);
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [descripcion, setDescripcion] = useState(null);

  useEffect(() => {
    const newItem = buildPO(context, tipoDePedido, descripcion);
    const itemToBeSet = fuseItems(newItem, currentItem);
    setNewItem(itemToBeSet);
  }, [context, tipoDePedido, descripcion]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Editar Pedido de Obra</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <SetContextoForm
              action={setContext}
              initialValues={currentItem}
              isEdit
            />

            <Text style={styles.fieldTitle}>Tipo de pedido</Text>
            <DropdownSelect
              placeholder={currentItem?.TipoDePedido}
              action={setTipoDePedido}
              category="tiposPedidosDePedidosObra"
              props={{ stackOrder: 10000 }}
              initialValue={currentItem?.tipoDePedido}
            />

            <Text style={styles.fieldTitle}>Detalle de pedido</Text>
            <TextInput
              placeholder="Detalle del pedido"
              onChangeText={(text) => {
                setDescripcion(text);
              }}
              defaultValue={currentItem?.Descripcion}
              style={[styles.input, { zIndex: 9000 }]}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default EditPedidoObra;

const buildPO = (context = null, tipoDePedido = null, descripcion = null) => {
  let pedidoObra = {
    Descripcion: descripcion,
    Fecha: getCurrentDateTime(),
    Status: obtenerStatus().pedido,
    User: getLoggedUser().email,
    TipoDePedido: tipoDePedido,
  };
  pedidoObra[entities.obra] = context?.obra;
  pedidoObra[entities.rubro] = context?.rubro;

  return pedidoObra;
};

const styles = StyleSheet.create({
  //Pantalla
  container: {},
  header: {},
  body: {
    marginBottom: 20,
  },

  //Form Section - Titulos
  detailTitlesWrapper: {},
  detailTitlesTitle: {
    fontSize: 32,
    color: palette.textDark,
    paddingVertical: 5,
  },

  //Form Section - Cuerpo
  formWrapper: {},
  fieldTitle: {
    marginTop: 10,
  },
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
