import React, { useState } from "react";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";

import {
  entities,
  getEmptyConstructor,
  commonAttrs,
  PRStates,
} from "../../Core/util/entities";
import { getCurrentDateTime } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import { createFSElementAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import styles from "../styles/Crear.style";

import Header from "../../sharedComponents/Header";
import Botones from "../../sharedComponents/Botones";
import ContextoSet from "../../sharedComponents/ContextoSet";

const CrearPedidoDeReintegro = ({ navigation }) => {
  const [context, setContext] = useState(null);
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleCrearPedidoReintegro = async () => {
    if (
      !context.obra ||
      !context.rubro ||
      !context.tarea ||
      monto == "" ||
      descripcion == ""
    ) {
      alert("Complete todos los campos");
      return;
    }

    let newPedidoReintegro = getEmptyConstructor(entities.pReintegro);

    newPedidoReintegro[commonAttrs.fechaCreacion] = getCurrentDateTime();
    newPedidoReintegro[commonAttrs.PRState] = PRStates.pedido;
    newPedidoReintegro[commonAttrs.creadoPor] = getLoggedUser().Email;
    newPedidoReintegro[commonAttrs.descripcion] = descripcion;
    newPedidoReintegro[commonAttrs.monto] = monto;
    newPedidoReintegro[commonAttrs.tarea] = context.tarea;
    newPedidoReintegro[entities.obra] = context.obra;
    newPedidoReintegro[entities.rubro] = context.rubro;

    await createFSElementAsync(newPedidoReintegro);
    navigation.navigate("ContraVerPedidosDeReintegroScreen");
  };

  return (
    <View style={styles.container}>
      <Header />

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
            <ContextoSet action={setContext} />

            {/* formulario especifico */}
            <TextInput
              placeholder="Justificacion del reintegro"
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
                  alert("Solo puede ingresar numeros enteros");
                }
              }}
              style={styles.input}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttonsWrapper}>
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
    </View>
  );
};

export default CrearPedidoDeReintegro;
