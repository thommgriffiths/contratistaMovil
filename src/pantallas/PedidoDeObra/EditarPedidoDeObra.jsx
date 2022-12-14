import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";

import ContextoSet from "../../sharedComponents/ContextoSet";
import DropdownSelect from "../../sharedComponents/DropdownSelect";
import { getCurrentDateTime, fuzeItems } from "../../Core/util/functions";
import { obtenerStatus } from "../../Core/util/mockFunctions";
import { getLoggedUser } from "../../Core/util/globalStore";
import {
  entities,
  getEmptyConstructor,
  commonAttrs,
} from "../../Core/util/entities";

import styles from "../styles/Editar.style";

const EditarPedidoDeObra = ({ currentItem, setNewItem }) => {
  const [context, setContext] = useState(null);
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const newItem = buildPO(context, tipoDePedido, descripcion);
    const fuzedItem = fuzeItems(newItem, currentItem);
    setNewItem(fuzedItem);
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
            <ContextoSet
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

export default EditarPedidoDeObra;

const buildPO = (context = null, tipoDePedido = null, descripcion = null) => {
  let pedidoObra = getEmptyConstructor(entities.pedidoDeObra);

  pedidoObra[commonAttrs.fechaEdicion] = getCurrentDateTime();
  pedidoObra[commonAttrs.status] = obtenerStatus().pedido;
  pedidoObra[commonAttrs.editadoPor] = getLoggedUser().Email;
  pedidoObra[commonAttrs.descripcion] = descripcion;
  pedidoObra["TipoDePedido"] = tipoDePedido;
  pedidoObra[commonAttrs.tarea] = context?.tarea;

  //entities values must be objects
  pedidoObra[entities.obra] = context?.obra ? context.obra : null;
  pedidoObra[entities.rubro] = context?.rubro ? context.rubro : null;

  return pedidoObra;
};
