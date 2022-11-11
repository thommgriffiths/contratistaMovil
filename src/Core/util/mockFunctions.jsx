export const obtenerStatus = () => ({
  pedido: "Pedido",
  enRevision: "En Revision",
  aprobado: "Aprobado",
  resuelto: "Resuelto",
  demorado: "Demorado",
});

//Dropdown items
const tiposPedidosDeObra = [
  { value: "pedidoMateriales", label: "Pedido de Materiales" },
  { value: "pedidoDefiniciones", label: "Pedido de Definicion" },
  { value: "pedidoPlanos", label: "Pedido plano detalle" },
];

export const obtenerDropdownItems = (type) => {
  switch (type) {
    case "tiposPedidosDePedidosObra":
      return tiposPedidosDeObra;
  }
};
