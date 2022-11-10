export const obtenerStatus = () => ({
  pedido: "Pedido",
  enRevision: "En Revision",
  aprobado: "Aprobado",
  resuelto: "Resuelto",
  demorado: "Demorado",
});

export const obtenerTiposDePedidosObra = () => [
  { value: "pedidoMateriales", label: "Pedido de Materiales" },
  { value: "pedidoDefiniciones", label: "Pedido de Definicion" },
  { value: "pedidoPlanos", label: "Pedido plano detalle" },
];
