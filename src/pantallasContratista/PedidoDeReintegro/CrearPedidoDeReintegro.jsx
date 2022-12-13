import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import Header from "../../sharedComponents/Header";
import Botones from "../../sharedComponents/Botones";
import ContextoSet from "../../sharedComponents/ContextoSet";

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

const CrearPedidoDeReintegro = ({ navigation }) => {
  const [context, SetContext] = useState(null);
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleCrearPedidoReintegro = async () => {
    let nuevoPedidoDeReintegro = getEmptyConstructor(
      entities.pedidoDeReintegro
    );

    console.log("pedido de reintegro creado con el empty constructor: ");
    console.log(nuevoPedidoDeReintegro);

    nuevoPedidoDeReintegro[commonAttrs.fechaCreacion] = getCurrentDateTime();
    nuevoPedidoDeReintegro[commonAttrs.status] = obtenerStatus().pedido;
    nuevoPedidoDeReintegro[commonAttrs.creadoPor] = getLoggedUser().Email;
    nuevoPedidoDeReintegro[commonAttrs.descripcion] = descripcion;
    nuevoPedidoDeReintegro["Monto"] = monto;

    //entities values must be objects
    nuevoPedidoDeReintegro[entities.obra] = { id: context.obra };
    nuevoPedidoDeReintegro[entities.rubro] = { id: context.rubro };
    nuevoPedidoDeReintegro[commonAttrs.tarea] = context.tarea;

    console.log(nuevoPedidoDeReintegro);
    await createFSElementAsync(nuevoPedidoDeReintegro);
    navigation.navigate("ContraVerPedidosDeReintegroScreen");
  };

  return (
    <View style={styles.container}>
      <Header style={styles.header} />

      {/* form container*/}
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Section title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>
              Crear Pedido de Reintegro
            </Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <ContextoSet action={SetContext} />

            {/* formulario especifico */}
            <TextInput
              placeholder="Detalle del pedido"
              value={descripcion}
              onChangeText={(text) => {
                setDescripcion(text);
              }}
              style={styles.input}
            />

            <TextInput
              placeholder="Monto del reintegro"
              value={monto}
              keyboardType="numeric"
              onChangeText={(text) => {
                if (+text || text == "") setMonto(text);
                else {
                  setMonto("");
                  alert("Valor invalido, reingreselo");
                }
              }}
              style={styles.input}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <Botones
        onOkFunction={handleCrearPedidoReintegro}
        onOkText={"Crear pedido de reintegro"}
        onCancelFunction={() =>
          navigation.navigate("ContraVerPedidosDeReintegroScreen")
        }
        onCancelText={"Volver"}
        style={styles.botonera}
      />
    </View>
  );
};

export default CrearPedidoDeReintegro;
