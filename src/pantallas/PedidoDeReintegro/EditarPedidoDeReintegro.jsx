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

const EditarPedidoDeReintegro = ({ currentItem, setNewItem }) => {
  const [context, setContext] = useState(null);
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const newItem = buildPdR(context, monto, descripcion);
    const fuzedItem = fuzeItems(newItem, currentItem);
    setNewItem(fuzedItem);
  }, [context, monto, descripcion]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>
              Editar Pedido de Reintegro
            </Text>
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

            <View style={{ zIndex: 1050 }}>
              <Text style={styles.fieldTitle}>Monto</Text>
              <TextInput
                placeholder="Ingrese el monto del reintegro"
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (+text || text == "") setMonto(text);
                  else {
                    setMonto("");
                    alert("Valor invalido, reingreselo");
                  }
                }}
                defaultValue={currentItem?.Monto}
                style={[styles.input, { zIndex: 9000 }]}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default EditarPedidoDeReintegro;

const buildPdR = (context = null, monto = null, descripcion = null) => {
  let pedidoReintegro = getEmptyConstructor(entities.pReintegro);

  pedidoReintegro[commonAttrs.fechaEdicion] = getCurrentDateTime();
  pedidoReintegro[commonAttrs.editadoPor] = getLoggedUser().Email;
  pedidoReintegro[commonAttrs.descripcion] = descripcion;
  pedidoReintegro[commonAttrs.monto] = monto;
  pedidoReintegro[commonAttrs.tarea] = context?.tarea;
  pedidoReintegro[entities.obra] = context?.obra ? context.obra : null;
  pedidoReintegro[entities.rubro] = context?.rubro ? context.rubro : null;

  return pedidoReintegro;
};
