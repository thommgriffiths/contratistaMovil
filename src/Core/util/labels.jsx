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
spanishLabels["tarea"] = "Tarea";
spanishLabels["FechaCreacion"] = "Fecha de carga";

//Pedido de Reintegro
spanishLabels["Monto"] = "Monto:";
spanishLabels["EstadoPedidoReintegro"] = "Estado del pedido";

//Pedido de obra
spanishLabels["pedidoMateriales"] = "Pedido de Materiales";
spanishLabels["pedidoDefiniciones"] = "Pedido de Definicion";
spanishLabels["pedidoPlanos"] = "Pedido plano detalle";

export const label = (key) => {
  return spanishLabels[key] ? spanishLabels[key] : key + "ESKEY";
};
