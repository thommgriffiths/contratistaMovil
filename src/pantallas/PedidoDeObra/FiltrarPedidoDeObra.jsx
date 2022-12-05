import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";

import SetContextoForm from "../../sharedComponents/SetContextoForm";
import DropdownSelect from "../../sharedComponents/DropdownSelect";
import { createQuery } from "../../Core/util/functions";
import { entities, commonAttrs } from "../../Core/util/entities";

import styles from "../styles/Editar.style";

const FiltrarPedidoDeObra = ({ setSearchParams }) => {
  const [context, setContext] = useState(null);
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const queryParams = {
      ...context,
      [commonAttrs.tipoPedidoObra]: tipoDePedido,
      [commonAttrs.descripcion]: descripcion,
      [commonAttrs.type]: entities.pedidoDeObra,
    };
    const newQuery = createQuery(queryParams);

    setSearchParams(newQuery);
  }, [context, tipoDePedido, descripcion]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>
              Filtrar Pedidos de Obra
            </Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <SetContextoForm action={setContext} noTarea />

            <Text style={styles.fieldTitle}>Tipo de pedido</Text>
            <DropdownSelect
              action={setTipoDePedido}
              category="tiposPedidosDePedidosObra"
              props={{ stackOrder: 10000 }}
            />

            <Text style={styles.fieldTitle}>Detalle de pedido</Text>
            <TextInput
              placeholder="Detalle del pedido"
              onChangeText={(text) => {
                setDescripcion(text);
              }}
              style={[styles.input, { zIndex: 9000 }]}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default FiltrarPedidoDeObra;
