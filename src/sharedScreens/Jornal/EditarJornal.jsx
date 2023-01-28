import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";

import {
  entities,
  getEmptyConstructor,
  commonAttrs,
} from "../../Core/util/entities";
import { getCurrentDateTime, fuzeItems } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Editar.style";

import ContextoSet from "../../sharedComponents/ContextoSet";

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
            <View style={{ zIndex: 10100 }}>
              <ContextoSet
                action={setContext}
                initialValues={currentItem}
                isEdit
              />
            </View>
            <View style={{ zIndex: 10080 }}>
              <Text style={styles.fieldTitle}>Cantidad dias hombre</Text>
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
  jornal[commonAttrs.editadoPor] = getLoggedUser().Email;
  jornal[commonAttrs.diasHombre] = diasHombre;
  jornal[commonAttrs.tarea] = context?.tarea;
  jornal[entities.obra] = context?.obra ? context.obra : null;
  jornal[entities.rubro] = context?.rubro ? context.rubro : null;

  return jornal;
};
