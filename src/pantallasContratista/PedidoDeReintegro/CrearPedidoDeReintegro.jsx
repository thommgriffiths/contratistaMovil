import React, { useState } from "react";
import { Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  entities,
  getEmptyConstructor,
  commonAttrs,
  PRStates,
} from "../../Core/util/entities";
import { createFSElementAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import { getCurrentDateTime } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Crear.style";

import Header from "../../sharedComponents/Header";
import Botones from "../../sharedComponents/Botones";
import DropDownSelectMobile from "../../sharedComponents/DropDownSelectMobile";

const CrearPedidoDeReintegro = ({ navigation }) => {
  const [obra, setObra] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [tarea, setTarea] = useState("");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleCrearPedidoReintegro = async () => {
    if (!monto || !descripcion || !tarea || !rubro || !obra) {
      alert("Complete todos los campos");
      return;
    }

    let newPedidoReintegro = getEmptyConstructor(entities.pReintegro);

    newPedidoReintegro[commonAttrs.fechaCreacion] = getCurrentDateTime();
    newPedidoReintegro[commonAttrs.PRState] = PRStates.pedido;
    newPedidoReintegro[commonAttrs.creadoPor] = getLoggedUser().Email;
    newPedidoReintegro[commonAttrs.descripcion] = descripcion;
    newPedidoReintegro[commonAttrs.monto] = monto;

    newPedidoReintegro[commonAttrs.tarea] = tarea;
    newPedidoReintegro[entities.obra] = obra;
    newPedidoReintegro[entities.rubro] = rubro;

    await createFSElementAsync(newPedidoReintegro);
    navigation.navigate("ContraVerPedidosDeReintegroScreen");
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
            <Text style={styles.titlesText}>Crear Pedido de Reintegro</Text>
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
              <TextInput
                placeholder="Justificacion del reintegro"
                value={descripcion}
                onChangeText={(text) => {
                  setDescripcion(text);
                }}
                style={styles.textInput}
                placeholderTextColor="grey"
              />
            </View>
            <View style={styles.inputWrapper}>
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
              onOkFunction={handleCrearPedidoReintegro}
              onOkText={"Crear pedido de reintegro"}
              onCancelFunction={() =>
                navigation.navigate("ContraVerPedidosDeReintegroScreen")
              }
              onCancelText={"Volver"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CrearPedidoDeReintegro;
