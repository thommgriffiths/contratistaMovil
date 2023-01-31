import React, { useState } from "react";
import { Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  entities,
  getEmptyConstructor,
  commonAttrs,
  POStates,
  POTypes,
} from "../../Core/util/entities";
import { createFSElementAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import { getCurrentDateTime } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Crear.style";

import Header from "../../sharedComponents/Header";
import Botones from "../../sharedComponents/Botones";
import DropDownSelectMobile from "../../sharedComponents/DropDownSelectMobile";

const ArqCrearPedidoDeObra = ({ navigation }) => {
  const [obra, setObra] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [tarea, setTarea] = useState("");
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  const handleCrearPedidoObra = async () => {
    if (!obra || !rubro || !tarea || !tipoDePedido || !descripcion)
      return alert("Complete todos los campos");

    let nuevoPedidoDeObra = getEmptyConstructor(entities.pedidoDeObra);

    nuevoPedidoDeObra[commonAttrs.fechaCreacion] = getCurrentDateTime();
    nuevoPedidoDeObra[commonAttrs.POState] = POStates.pedido;
    nuevoPedidoDeObra[commonAttrs.creadoPor] = getLoggedUser().Email;
    nuevoPedidoDeObra[commonAttrs.descripcion] = descripcion;
    nuevoPedidoDeObra[commonAttrs.tipoPedidoObra] = tipoDePedido;
    nuevoPedidoDeObra[commonAttrs.tarea] = tarea;
    nuevoPedidoDeObra[entities.obra] = obra;
    nuevoPedidoDeObra[entities.rubro] = rubro;

    await createFSElementAsync(nuevoPedidoDeObra);
    navigation.navigate("ArqVerPedidosDeObraScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View styles={styles.headerWrapper}>
        <Header />
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContentContainer}
      >
        <View style={styles.bodytop}>
          <View style={styles.titlesWrapper}>
            <Text style={styles.titlesText}>Crear Pedido de Obra</Text>
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
              <TextInput
                placeholder="Describa la tarea afectada"
                value={tarea}
                onChangeText={(text) => {
                  setTarea(text);
                }}
                style={styles.textInput}
                placeholderTextColor="grey"
              />
            </View>

            <View style={styles.inputWrapper}>
              <DropDownSelectMobile
                options={POTypes}
                placeholder="Seleccione tipo de pedido"
                set={(value) => setTipoDePedido(value)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Detalle del pedido"
                value={descripcion}
                onChangeText={(text) => {
                  setDescripcion(text);
                }}
                style={styles.textInput}
                placeholderTextColor="grey"
              />
            </View>
            <View style={{ height: 55 }}></View>
          </View>
        </View>

        <View style={styles.bodybottom}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArqCrearPedidoDeObra;
