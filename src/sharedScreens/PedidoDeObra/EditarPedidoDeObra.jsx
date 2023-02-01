import React, { useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";

import { entities, commonAttrs, POTypes } from "../../Core/util/entities";
import { getCurrentDateTime } from "../../Core/util/functions";
import { getLoggedUser } from "../../Core/util/globalStore";
import styles from "../styles/Editar.style";

import DropDownSelectMobile from "../../sharedComponents/DropDownSelectMobile";

const EditarPedidoDeObra = ({ currentItem, setNewItem }) => {
  const [obra, setObra] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [tarea, setTarea] = useState("");
  const [tipoDePedido, setTipoDePedido] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    let newPO = {};

    if (obra) newPO[entities.obra] = obra;
    if (rubro) newPO[entities.rubro] = rubro;
    if (tarea) newPO[commonAttrs.tarea] = tarea;
    if (tipoDePedido) newPO[commonAttrs.tipoPedidoObra] = tipoDePedido;
    if (descripcion) newPO[commonAttrs.descripcion] = descripcion;

    if (Object.keys(newPO).length > 0) {
      newPO[commonAttrs.id] = currentItem[commonAttrs.id];
      newPO[commonAttrs.type] = entities.pedidoDeObra;
      newPO[commonAttrs.fechaEdicion] = getCurrentDateTime();
      newPO[commonAttrs.editadoPor] = getLoggedUser().Email;
      setNewItem(newPO);
    }
  }, [obra, rubro, tarea, tipoDePedido, descripcion]);

  return (
    <View style={styles.container}>
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesText}>Editar Pedido de Obra</Text>
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

        <Text style={styles.fieldTitle}>Tipo de pedido</Text>
        <View style={styles.inputWrapper}>
          <DropDownSelectMobile
            options={POTypes}
            set={(value) => setTipoDePedido(value)}
            defaultValue={currentItem?.[commonAttrs.tipoPedidoObra]}
          />
        </View>

        <Text style={styles.fieldTitle}>Detalle de pedido</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={currentItem?.Descripcion}
            value={descripcion}
            onChangeText={(text) => {
              setDescripcion(text);
            }}
            style={styles.textInput}
            placeholderTextColor="grey"
          />
        </View>
      </View>
    </View>
  );
};

export default EditarPedidoDeObra;
