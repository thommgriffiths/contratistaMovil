import { KeyboardAvoidingView, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import SetContextoForm from "../../sharedComponents/SetContextoForm";
import { createQuery } from "../../Core/util/functions";
import { commonAttrs } from "../../Core/util/entities";

import { RangePicker } from "../../sharedComponents/dateComponents/rangePicker";

import styles from "../styles/Editar.style";

const FiltrarJornales = ({ setSearchParams }) => {
  const [context, setContext] = useState(null);
  const [rangoFechaCreacion, setRangoFechaCreacion] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  useEffect(() => {
    const queryParams = {
      ...context,
      [commonAttrs.fechaCreacionRango]: rangoFechaCreacion,
    };
    const newQuery = createQuery(queryParams);

    //console.log(newQuery);
    setSearchParams(newQuery);
  }, [context, rangoFechaCreacion]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <KeyboardAvoidingView behavior="height">
          {/*Title*/}
          <View style={styles.detailTitlesWrapper}>
            <Text style={styles.detailTitlesTitle}>Filtrar Jornales</Text>
          </View>

          {/*Form */}
          <View style={styles.formWrapper}>
            <SetContextoForm action={setContext} noTarea />

            <Text style={styles.fieldTitle}>Fechas de Creacion</Text>

            <RangePicker AddRange={setRangoFechaCreacion} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default FiltrarJornales;
