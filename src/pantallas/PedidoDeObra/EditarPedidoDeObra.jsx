import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";

import {
  entities,
  getEmptyConstructor,
  commonAttrs,
} from "../../Core/util/entities";
import { getCurrentDateTime, fuzeItems } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Editar.style";

import ContextoSet from "../../sharedComponents/ContextoSet";
import DropdownSelect from "../../sharedComponents/DropdownSelect";

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
            <View style={{ zIndex: 10100 }}>
              <ContextoSet
                action={setContext}
                initialValues={currentItem}
                isEdit
              />
            </View>

            <View style={{ zIndex: 1080 }}>
              <Text style={styles.fieldTitle}>Tipo de pedido</Text>
              <DropdownSelect
                placeholder={currentItem?.TipoDePedido}
                action={setTipoDePedido}
                category="tiposPedidosDePedidosObra"
                props={{ stackOrder: 10000 }}
                initialValue={currentItem?.tipoDePedido}
              />
            </View>

            <View style={{ zIndex: 1050 }}>
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
  pedidoObra[commonAttrs.editadoPor] = getLoggedUser().Email;
  pedidoObra[commonAttrs.descripcion] = descripcion;
  pedidoObra[commonAttrs.tipoPedidoObra] = tipoDePedido;
  pedidoObra[commonAttrs.tarea] = context?.tarea;
  pedidoObra[entities.obra] = context?.obra ? context.obra : null;
  pedidoObra[entities.rubro] = context?.rubro ? context.rubro : null;

  return pedidoObra;
};
