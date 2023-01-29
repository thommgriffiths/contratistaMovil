import React, { useState } from "react";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";

import {
  entities,
  getEmptyConstructor,
  commonAttrs,
  POStates,
} from "../../Core/util/entities";
import { createFSElementAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import { getCurrentDateTime } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Crear.style";

import Header from "../../sharedComponents/Header";
import Botones from "../../sharedComponents/Botones";
import ContextoSet from "../../sharedComponents/ContextoSet";
import DropdownSelect from "../../sharedComponents/DropdownSelect";

const ArqCrearPedidoDeObra = ({ navigation }) => {
  const [context, SetContext] = useState(null);
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  const handleCrearPedidoObra = async () => {
    if (
      !context.obra ||
      !context.rubro ||
      !context.tarea ||
      !tipoDePedido ||
      !descripcion
    )
      return alert("Complete todos los campos");

    let nuevoPedidoDeObra = getEmptyConstructor(entities.pedidoDeObra);

    nuevoPedidoDeObra[commonAttrs.fechaCreacion] = getCurrentDateTime();
    nuevoPedidoDeObra[commonAttrs.POState] = POStates.pedido;
    nuevoPedidoDeObra[commonAttrs.creadoPor] = getLoggedUser().Email;
    nuevoPedidoDeObra[commonAttrs.descripcion] = descripcion;
    nuevoPedidoDeObra[commonAttrs.tipoPedidoObra] = tipoDePedido;
    nuevoPedidoDeObra[commonAttrs.tarea] = context.tarea;
    nuevoPedidoDeObra[entities.obra] = context.obra;
    nuevoPedidoDeObra[entities.rubro] = context.rubro;

    await createFSElementAsync(nuevoPedidoDeObra);
    navigation.navigate("ArqVerPedidosDeObraScreen");
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* form container*/}
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Section title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Crear Pedido de Obra</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <View style={{ zIndex: 10100 }}>
              <ContextoSet action={SetContext} />
            </View>
            <View style={{ zIndex: 10080 }}>
              <DropdownSelect
                placeholder="Seleccione tipo de pedido"
                action={setTipoDePedido}
                category={commonAttrs.tipoPedidoObra}
                props={{ stackOrder: 10000 }}
              />
            </View>
            <View style={{ zIndex: 10050 }}>
              <TextInput
                placeholder="Detalle del pedido"
                value={descripcion}
                onChangeText={(text) => {
                  setDescripcion(text);
                }}
                style={[styles.input, { zIndex: 9000 }]}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.buttonsWrapper}>
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
    </View>
  );
};

export default ArqCrearPedidoDeObra;
