import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";

import Header from "../../sharedComponents/Header";
import Botones from "../../sharedComponents/Botones";
import ContextoSet from "../../sharedComponents/ContextoSet";

import { getCurrentDateTime } from "../../Core/util/functions";
//import { obtenerStatus } from "../../Core/util/mockFunctions";
import { getLoggedUser } from "../../Core/util/globalStore";
import {
  entities,
  getEmptyConstructor,
  commonAttrs,
  jornalStates,
} from "../../Core/util/entities";
import { createFSElementAsync } from "../../Core/Firebase/FirebaseFirestoreManager";

import styles from "../styles/Crear.style";

const CrearJornal = ({ navigation }) => {
  const [context, SetContext] = useState(null);
  const [diasHombre, setDiasHombre] = useState("");

  useEffect(() => console.log(diasHombre), [diasHombre]);

  const handleCrearJornal = async () => {
    let nuevoJornal = getEmptyConstructor(entities.jornal);

    console.log("jornal creado con el empty constructor: ");
    console.log(nuevoJornal);

    nuevoJornal[commonAttrs.fechaCreacion] = getCurrentDateTime();
    nuevoJornal[commonAttrs.status] = jornalStates.pedido;
    nuevoJornal[commonAttrs.creadoPor] = getLoggedUser().Email;
    nuevoJornal[commonAttrs.diasHombre] = diasHombre;
    //entities values must be objects
    nuevoJornal[entities.obra] = { id: context.obra };
    nuevoJornal[entities.rubro] = { id: context.rubro };
    nuevoJornal[commonAttrs.tarea] = context.tarea;

    console.log(nuevoJornal);
    await createFSElementAsync(nuevoJornal);
    navigation.navigate("VerJornalesScreen");
  };

  return (
    <View style={styles.container}>
      <Header style={styles.header} />

      {/* form container*/}
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Section title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Crear Jornal</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <ContextoSet action={SetContext} />

            {/* formulario especifico */}

            <TextInput
              placeholder="Cantidad de dias hombre"
              value={diasHombre}
              onChangeText={(text) => {
                if (+text || text == "") setDiasHombre(text);
                else {
                  setDiasHombre("");
                  alert("Valor invalido, reingreselo");
                }
              }}
              style={styles.input}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <Botones
        onOkFunction={handleCrearJornal}
        onOkText={"Crear jornal"}
        onCancelFunction={() => navigation.navigate("VerJornalesScreen")}
        onCancelText={"Volver"}
        style={styles.botonera}
      />
    </View>
  );
};

export default CrearJornal;
