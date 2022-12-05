import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";

import ContextoSet from "../../sharedComponents/ContextoSet";
import { getCurrentDateTime, fuzeItems } from "../../Core/util/functions";
import { obtenerStatus } from "../../Core/util/mockFunctions";
import { getLoggedUser } from "../../Core/util/globalStore";
import {
  entities,
  getEmptyConstructor,
  commonAttrs,
} from "../../Core/util/entities";

import styles from "../styles/Editar.style";

const EditarJornal = ({ currentItem, setNewItem }) => {
  const [context, setContext] = useState(null);
  const [diasHombre, setDiasHombre] = useState("");

  useEffect(() => {
    const newItem = buildJornal(context, diasHombre);
    const fuzedItem = fuzeItems(newItem, currentItem);
    setNewItem(fuzedItem);
  }, [context, diasHombre]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Editar Jornal</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <ContextoSet
              action={setContext}
              initialValues={currentItem}
              isEdit
            />

            <Text style={styles.fieldTitle}>Tipo de jornal</Text>

            <Text style={styles.fieldTitle}>Detalle de jornal</Text>
            <TextInput
              placeholder="Ingrese cantidad dias hombre"
              keyboardType="numeric"
              onChangeText={(text) => {
                if (+text || text == "") setDiasHombre(text);
                else {
                  setDiasHombre("");
                  alert("Valor invalido, reingreselo");
                }
              }}
              defaultValue={currentItem?.DiasHombre}
              style={[styles.input, { zIndex: 9000 }]}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default EditarJornal;

const buildJornal = (context = null, diasHombre = null) => {
  let jornal = getEmptyConstructor(entities.jornal);

  jornal[commonAttrs.fechaEdicion] = getCurrentDateTime();
  jornal[commonAttrs.status] = obtenerStatus().pedido;
  jornal[commonAttrs.editadoPor] = getLoggedUser().email;
  jornal[commonAttrs.diasHombre] = diasHombre;
  jornal[commonAttrs.tarea] = context?.tarea;

  //entities values must be objects
  jornal[entities.obra] = context?.obra ? { id: context.obra } : null;
  jornal[entities.rubro] = context?.rubro ? { id: context.rubro } : null;

  return jornal;
};
