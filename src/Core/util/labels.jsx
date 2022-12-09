var spanishLabels = {};

spanishLabels["casita"] = "nada nuevo";

spanishLabels["Status"] = "Estatus";
spanishLabels["User"] = "Usuario";
spanishLabels["Descripcion"] = "Descripción";
spanishLabels["obra"] = "Obra";
spanishLabels["rubro"] = "Rubro";

//Obra
spanishLabels["Nombre"] = "Nombre";
spanishLabels["Direccion"] = "Dirección";
spanishLabels["Propietario"] = "Propietario";

//Jornal
spanishLabels["DiasHombre"] = "Dias hombre";

//Pedido de Reintegro
spanishLabels["Monto"] = "Monto:";

export const label = (key) => {
  return spanishLabels[key] ? spanishLabels[key] : key + "ESKEY";
};
