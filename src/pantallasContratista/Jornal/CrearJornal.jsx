import React, { useState } from "react";
import { Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
import DropDownSelectMobile from "../../sharedComponents/DropDownSelectMobile";

const CrearJornal = ({ navigation }) => {
  const [obra, setObra] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [tarea, setTarea] = useState("");
  const [diasHombre, setDiasHombre] = useState("");

  const handleCrearJornal = async () => {
    if (!diasHombre || !tarea || !rubro || !obra) {
      alert("Complete todos los campos");
      return;
    }

    let nuevoJornal = getEmptyConstructor(entities.jornal);

    nuevoJornal[commonAttrs.fechaCreacion] = getCurrentDateTime();
    nuevoJornal[commonAttrs.jornalState] = jornalStates.requested;
    nuevoJornal[commonAttrs.creadoPor] = getLoggedUser().Email;
    nuevoJornal[commonAttrs.diasHombre] = diasHombre;
    nuevoJornal[commonAttrs.tarea] = tarea;
    nuevoJornal[entities.obra] = obra;
    nuevoJornal[entities.rubro] = rubro;

    await createFSElementAsync(nuevoJornal);
    navigation.navigate("ContraVerJornalesScreen");
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
            <Text style={styles.titlesText}>Cargar nuevos jornales</Text>
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
                placeholder="Cantidad de dias hombre"
                value={diasHombre}
                onChangeText={(text) => {
                  if (+text || text == "") setDiasHombre(text);
                  else {
                    setDiasHombre("");
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
              onOkFunction={handleCrearJornal}
              onOkText={"Crear jornal"}
              onCancelFunction={() =>
                navigation.navigate("ContraVerJornalesScreen")
              }
              onCancelText={"Volver"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CrearJornal;
