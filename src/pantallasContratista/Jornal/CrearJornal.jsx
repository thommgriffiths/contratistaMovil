import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import {
  entities,
  getEmptyConstructor,
  commonAttrs,
  jornalStates,
} from "../../Core/util/entities";
import { getCurrentDateTime } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import { createFSElementAsync } from "../../Core/Firebase/FirebaseFirestoreManager";
import styles from "../styles/Crear.style";

import Header from "../../sharedComponents/Header";
import Botones from "../../sharedComponents/Botones";
import ContextoSet from "../../sharedComponents/ContextoSet";

const CrearJornal = ({ navigation }) => {
  const [context, SetContext] = useState(null);
  const [diasHombre, setDiasHombre] = useState("");

  const handleCrearJornal = async () => {
    if (!context.obra || !context.rubro || !context.tarea || !diasHombre) {
      alert("Debe completar todos los campos");
      return;
    }

    let nuevoJornal = getEmptyConstructor(entities.jornal);

    nuevoJornal[commonAttrs.fechaCreacion] = getCurrentDateTime();
    nuevoJornal[commonAttrs.jornalState] = jornalStates.requested;
    nuevoJornal[commonAttrs.creadoPor] = getLoggedUser().Email;
    nuevoJornal[commonAttrs.diasHombre] = diasHombre;
    nuevoJornal[entities.obra] = context.obra;
    nuevoJornal[entities.rubro] = context.rubro;
    nuevoJornal[commonAttrs.tarea] = context.tarea;

    console.log(nuevoJornal);
    await createFSElementAsync(nuevoJornal);
    navigation.navigate("ContraVerJornalesScreen");
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* form container*/}
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Section title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Cargar nuevos jornales</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <ContextoSet action={SetContext} />

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

      <View style={styles.buttonsWrapper}>
        <Botones
          onOkFunction={handleCrearJornal}
          onOkText={"Crear jornal"}
          onCancelFunction={() =>
            navigation.navigate("ContraVerJornalesScreen")
          }
          onCancelText={"Volver"}
          style={styles.botonera}
        />
      </View>
    </View>
  );
};

export default CrearJornal;
