import React, { useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";

import { entities, commonAttrs } from "../../Core/util/entities";
import { getCurrentDateTime } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Editar.style";

import DropDownSelectMobile from "../../sharedComponents/DropDownSelectMobile";

const EditarPedidoDeReintegro = ({ currentItem, setNewItem }) => {
  const [obra, setObra] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [tarea, setTarea] = useState("");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    let newPR = {};

    if (obra) newPR[entities.obra] = obra;
    if (rubro) newPR[entities.rubro] = rubro;
    if (tarea) newPR[commonAttrs.tarea] = tarea;
    if (descripcion) newPR[commonAttrs.descripcion] = descripcion;
    if (monto) newPR[commonAttrs.monto] = monto;

    if (Object.keys(newPR).length > 0) {
      newPR[commonAttrs.id] = currentItem[commonAttrs.id];
      newPR[commonAttrs.type] = entities.pReintegro;
      newPR[commonAttrs.fechaEdicion] = getCurrentDateTime();
      newPR[commonAttrs.editadoPor] = getLoggedUser().Email;
      setNewItem(newPR);
    }
  }, [obra, rubro, tarea, monto, descripcion]);

  return (
    <View style={styles.container}>
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesText}>Editar Pedido de Reintegro</Text>
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
        <Text style={styles.fieldTitle}>Justificacion del reintegro</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={currentItem?.[commonAttrs.descripcion]}
            value={descripcion}
            onChangeText={(text) => {
              setDescripcion(text);
            }}
            style={styles.textInput}
            placeholderTextColor="grey"
          />
        </View>

        <Text style={styles.fieldTitle}>Monto del reintegro</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={currentItem?.[commonAttrs.monto]}
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
      </View>
    </View>
  );
};

export default EditarPedidoDeReintegro;
