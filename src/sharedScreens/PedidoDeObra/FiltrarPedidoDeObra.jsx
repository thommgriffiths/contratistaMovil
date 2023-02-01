import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import {
  entities,
  commonAttrs,
  POTypes,
  POStates,
} from "../../Core/util/entities";
import { createQuery } from "../../Core/util/functions";
import styles from "../styles/Editar.style";

import DropDownSelectMobile from "../../sharedComponents/DropDownSelectMobile";

const FiltrarPedidoDeObra = ({ setSearchParams }) => {
  const [obra, setObra] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    const queryParams = {
      [entities.obra]: obra,
      [entities.rubro]: rubro,
      [commonAttrs.tipoPedidoObra]: tipoDePedido,
      [commonAttrs.POState]: estado,
    };
    const newQuery = createQuery(queryParams);
    setSearchParams(newQuery);
  }, [obra, rubro, tipoDePedido, estado]);

  return (
    <View style={styles.container}>
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesText}>Filtrar Pedidos de Obra</Text>
      </View>

      <View style={styles.formWrapper}>
        <View style={styles.inputWrapper}>
          <DropDownSelectMobile
            options={entities.obra}
            placeholder="Seleccione una obra"
            remote
            set={(value) => setObra(value)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <DropDownSelectMobile
            options={entities.rubro}
            placeholder="Seleccione un rubro"
            remote
            set={(value) => setRubro(value)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <DropDownSelectMobile
            options={POTypes}
            placeholder="Tipo de Pedido"
            set={(value) => setTipoDePedido(value)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <DropDownSelectMobile
            options={POStates}
            placeholder="Estado del pedido"
            set={(value) => setEstado(value)}
          />
        </View>
      </View>
    </View>
  );
};

export default FiltrarPedidoDeObra;
