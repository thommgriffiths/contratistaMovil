import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import Header from "../../sharedComponents/Header";
import Botones from "../../sharedComponents/Botones";
import ContextoSet from "../../sharedComponents/ContextoSet";
import DropdownSelect from "../../sharedComponents/DropdownSelect";

import { getCurrentDateTime } from "../../Core/util/functions";
import { obtenerStatus } from "../../Core/util/mockFunctions";
import { getLoggedUser } from "../../Core/util/globalStore";
import {
  entities,
  getEmptyConstructor,
  commonAttrs,
} from "../../Core/util/entities";
import { createFSElementAsync } from "../../Core/Firebase/FirebaseFirestoreManager";

import styles from "../styles/Crear.style";

const ArqCrearPedidoDeObra = ({ navigation }) => {
  const [context, SetContext] = useState(null);
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  const handleCrearPedidoObra = async () => {
    let nuevoPedidoDeObra = getEmptyConstructor(entities.pedidoDeObra);

    console.log("pedido de obra creado con el empty constructor: ");
    console.log(nuevoPedidoDeObra);

    nuevoPedidoDeObra[commonAttrs.fechaCreacion] = getCurrentDateTime();
    nuevoPedidoDeObra[commonAttrs.status] = obtenerStatus().pedido;
    nuevoPedidoDeObra[commonAttrs.creadoPor] = getLoggedUser().Email;
    nuevoPedidoDeObra[commonAttrs.descripcion] = descripcion;
    nuevoPedidoDeObra["TipoDePedido"] = tipoDePedido;

    //entities values must be objects
    nuevoPedidoDeObra[entities.obra] = context.obra;
    nuevoPedidoDeObra[entities.rubro] = context.rubro;
    nuevoPedidoDeObra[commonAttrs.tarea] = context.tarea;

    console.log(nuevoPedidoDeObra);
    await createFSElementAsync(nuevoPedidoDeObra);
    navigation.navigate("ArqVerPedidosDeObraScreen");
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
            <ContextoSet action={SetContext} />

            {/* formulario especifico */}
            <DropdownSelect
              placeholder="Seleccione tipo de pedido"
              action={setTipoDePedido}
              category="tiposPedidosDePedidosObra"
              props={{ stackOrder: 10000 }}
            />

            <TextInput
              placeholder="Detalle del pedido"
              value={descripcion}
              onChangeText={(text) => {
                setDescripcion(text);
              }}
              style={[styles.input, { zIndex: 9000 }]}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <Botones
        onOkFunction={handleCrearPedidoObra}
        onOkText={"Crear pedido de obra"}
        onCancelFunction={() =>
          navigation.navigate("ArqVerPedidosDeObraScreen")
        }
        onCancelText={"Volver"}
        style={styles.botonera}
      />
    </View>
  );
};

export default ArqCrearPedidoDeObra;
