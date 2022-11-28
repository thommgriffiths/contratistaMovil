import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import Header from "../../sharedComponents/Header";
import Botones from "../../sharedComponents/Botones";
import SetContextoForm from "../../sharedComponents/SetContextoForm";
import DropdownSelect from "../../sharedComponents/DropdownSelect";

import { getCurrentDateTime } from "../../Core/util/functions";
import { obtenerStatus } from "../../Core/util/mockFunctions";
import { getLoggedUser } from "../../Core/util/globalStore";
import {
  entities,
  getEmptyConstructor,
  commonVariables,
} from "../../Core/util/entities";
import { createFSElementAsync } from "../../Core/Firebase/FirebaseFirestoreManager";

import styles from "../styles/Crear.style";

const CrearPedidoDeObra = ({ navigation }) => {
  const [context, SetContext] = useState(null);
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  const handleCrearPedidoObra = async () => {
    let nuevoPedidoDeObra = getEmptyConstructor(entities.pedidoDeObra);

    nuevoPedidoDeObra[commonVariables.fecha] = getCurrentDateTime();
    nuevoPedidoDeObra[commonVariables.status] = obtenerStatus().pedido;
    nuevoPedidoDeObra[commonVariables.user] = getLoggedUser().email;
    nuevoPedidoDeObra[commonVariables.descripcion] = descripcion;
    nuevoPedidoDeObra["TipoDePedido"] = tipoDePedido;

    //entities values must be objects
    nuevoPedidoDeObra[entities.obra] = { id: context.obra };
    nuevoPedidoDeObra[entities.rubro] = { id: context.rubro };
    nuevoPedidoDeObra[commonVariables.tarea] = context.tarea;

    console.log(nuevoPedidoDeObra);
    await createFSElementAsync(nuevoPedidoDeObra);
    navigation.navigate("VerPedidosDeObraScreen");
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
        onCancelFunction={() => navigation.navigate("VerPedidosDeObraScreen")}
        onCancelText={"Volver"}
        style={styles.botonera}
      />
    </View>
  );
};

export default CrearPedidoDeObra;
