import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";

import { createQuery } from "../../Core/util/functions";
import { commonAttrs, jornalStates } from "../../Core/util/entities";
import styles from "../styles/Editar.style";

import ContextoSet from "../../sharedComponents/ContextoSet";
import DropdownSelect from "../../sharedComponents/DropdownSelect";
import RangePicker from "../../sharedComponents/dateComponents/RangePicker";

const FiltrarJornales = ({ setSearchParams }) => {
  const [context, setContext] = useState(null);
  const [estado, setEstado] = useState(null);
  const [rangoFechaCreacion, setRangoFechaCreacion] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  useEffect(() => {
    const queryParams = {
      ...context,
      [commonAttrs.fechaCreacionRango]: rangoFechaCreacion,
      [commonAttrs.jornalState]: jornalStates?.[estado],
    };
    const newQuery = createQuery(queryParams);

    console.log(newQuery);
    setSearchParams(newQuery);
  }, [context, rangoFechaCreacion, estado]);

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
            <View style={{ zIndex: 10100 }}>
              <ContextoSet action={setContext} noTarea />
            </View>
            <View style={{ zIndex: 10080 }}>
              <DropdownSelect
                placeholder="Estado"
                action={setEstado}
                category={commonAttrs.jornalState}
                props={{ stackOrder: 14000 }}
              />
            </View>
            <View style={{ zIndex: 10050 }}>
              <RangePicker AddRange={setRangoFechaCreacion} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default FiltrarJornales;
