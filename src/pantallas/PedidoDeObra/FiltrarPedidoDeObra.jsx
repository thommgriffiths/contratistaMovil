import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";

import { createQuery } from "../../Core/util/functions";
import { entities, commonAttrs } from "../../Core/util/entities";
import styles from "../styles/Editar.style";

import ContextoSet from "../../sharedComponents/ContextoSet";
import DropdownSelect from "../../sharedComponents/DropdownSelect";

const FiltrarPedidoDeObra = ({ setSearchParams }) => {
  const [context, setContext] = useState(null);
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    const queryParams = {
      ...context,
      [commonAttrs.tipoPedidoObra]: tipoDePedido,
      [commonAttrs.POState]: estado,
    };
    const newQuery = createQuery(queryParams);

    setSearchParams(newQuery);
  }, [context, tipoDePedido]);

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
            <View style={{ zIndex: 10100 }}>
              <ContextoSet action={setContext} noTarea />
            </View>
            <View style={{ zIndex: 10080 }}>
              <DropdownSelect
                action={setTipoDePedido}
                category={commonAttrs.tipoPedidoObra}
                placeholder={"Tipo de Pedido"}
                props={{ stackOrder: 10000 }}
              />
            </View>
            <View style={{ zIndex: 10050 }}>
              <DropdownSelect
                action={setTipoDePedido}
                category={commonAttrs.POState}
                placeholder={"Estado del pedido"}
                props={{ stackOrder: 10000 }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default FiltrarPedidoDeObra;
