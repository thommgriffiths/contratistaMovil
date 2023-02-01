import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import {
  commonAttrs,
  entities,
  jornalStates,
  queryAttrs,
} from "../../Core/util/entities";
import { createQuery } from "../../Core/util/functions";
import styles from "../styles/Editar.style";

import DropDownSelectMobile from "../../sharedComponents/DropDownSelectMobile";
import DateInput from "../../sharedComponents/dateComponents/DateInput";

const FiltrarJornales = ({ setSearchParams }) => {
  const [obra, setObra] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [estado, setEstado] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  useEffect(() => {
    const queryParams = {
      [entities.obra]: obra,
      [entities.rubro]: rubro,
      [commonAttrs.jornalState]: jornalStates?.[estado],
      [queryAttrs.fechaCreacionInicio]: fechaInicio,
      [queryAttrs.fechaCreacionFin]: fechaFin,
    };
    const newQuery = createQuery(queryParams);

    setSearchParams(newQuery);
  }, [obra, rubro, estado, fechaInicio, fechaFin]);

  return (
    <View style={styles.container}>
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesText}>Filtrar Jornales</Text>
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
          <DropDownSelectMobile
            options={jornalStates}
            placeholder="Seleccione estado"
            set={(value) => setEstado(value)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <DateInput
            placeholder="Fecha de inicio"
            set={setFechaInicio}
            decorator="Desde: "
          />
        </View>

        <View style={styles.inputWrapper}>
          <DateInput
            placeholder="Fecha de fin"
            set={setFechaFin}
            decorator="Hasta: "
          />
        </View>
      </View>
    </View>
  );
};

export default FiltrarJornales;
