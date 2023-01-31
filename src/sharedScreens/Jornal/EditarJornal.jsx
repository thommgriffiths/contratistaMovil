import React, { useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";

import { entities, commonAttrs } from "../../Core/util/entities";
import { getCurrentDateTime } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Editar.style";

import DropDownSelectMobile from "../../sharedComponents/DropDownSelectMobile";

const EditarJornal = ({ currentItem, setNewItem }) => {
  const [obra, setObra] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [tarea, setTarea] = useState("");
  const [diasHombre, setDiasHombre] = useState("");

  useEffect(() => {
    let newJornal = {};

    if (obra) newJornal[entities.obra] = obra;
    if (rubro) newJornal[entities.rubro] = rubro;
    if (tarea) newJornal[commonAttrs.tarea] = tarea;
    if (diasHombre) newJornal[commonAttrs.diasHombre] = diasHombre;

    if (Object.keys(newJornal).length > 0) {
      newJornal[commonAttrs.id] = currentItem[commonAttrs.id];
      newJornal[commonAttrs.type] = entities.jornal;
      newJornal[commonAttrs.fechaEdicion] = getCurrentDateTime();
      newJornal[commonAttrs.editadoPor] = getLoggedUser().Email;
      setNewItem(newJornal);
    }
  }, [obra, rubro, tarea, diasHombre]);

  return (
    <View style={styles.container}>
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesText}>Editar Jornal</Text>
      </View>

      <View style={styles.formWrapper}>
        <Text style={styles.fieldTitle}>Seleccione una obra</Text>
        <View style={styles.inputWrapper}>
          <DropDownSelectMobile
            options={entities.obra}
            remote
            set={(value) => setObra(value)}
            defaultValue={currentItem?.[entities.obra][commonAttrs.id]}
          />
        </View>
        <Text style={styles.fieldTitle}>Seleccione un rubro</Text>
        <View style={styles.inputWrapper}>
          <DropDownSelectMobile
            options={entities.rubro}
            remote
            set={(value) => setRubro(value)}
            defaultValue={currentItem?.[entities.rubro][commonAttrs.id]}
          />
        </View>
        <Text style={styles.fieldTitle}>Describa la tarea afectada</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={currentItem?.[commonAttrs.tarea]}
            value={tarea}
            onChangeText={(text) => {
              setTarea(text);
            }}
            style={styles.textInput}
            placeholderTextColor="grey"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.fieldTitle}>Cantidad dias hombre</Text>
          <TextInput
            placeholder={currentItem?.[commonAttrs.diasHombre]}
            value={diasHombre}
            onChangeText={(text) => {
              if (+text || text == "") setDiasHombre(text);
              else {
                setDiasHombre("");
                alert("Valor invalido, reingreselo");
              }
            }}
            style={styles.textInput}
            placeholderTextColor="grey"
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

export default EditarJornal;
