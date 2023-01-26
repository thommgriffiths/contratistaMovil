//Los entities deben ser si o si un objeto definido comun en mi modelo de datos.
//.Todos deben tener los atributos obligatorios especificados abajo
export const entities = {
  obra: "obra",
  rubro: "rubro",
  jornal: "jornal",
  pReintegro: "pedidoDeReintegro",
  pedidoDeObra: "pedidoDeObra",
  user: "user",
};

export const commonAttrs = {
  //Obligarios
  id: "id",
  type: "type",
  nombre: "Nombre",
  fechaCreacion: "FechaCreacion",
  fechaEdicion: "FechaEdicion",
  creadoPor: "CreadoPor",
  editadoPor: "EditadoPor",

  //Otros
  fecha: "Fecha",
  id: "id",
  type: "type",
  user: "User",
  descripcion: "Descripcion",
  tarea: "tarea",
  propietario: "Propietario",
  direccion: "Direccion",
  diasHombre: "DiasHombre",
  apellido: "Apellido",
  email: "Email",
  firebaseID: "firebaseID",
  tipoPedidoObra: "TipoDePedido",
  status: "Status",
  descripcion: "Descripcion",
  monto: "Monto",
  validated: "Validado",
  userType: "tipoUsuario",
  enabled: "Habilitado",
  jornalState: "EstadoJornal",
  PRState: "EstadoPedidoReintegro",
  PRComment: "ComentarioPedidoReintegro",
  POState: "EstadoPedidoObra",

  //Solo para consultas
  fechaCreacionRango: "FechaCreacionRango",
};

export const jornalStates = {
  requested: "Pedido",
  validated: "Validado",
  rejected: "Rechazado",
  inReview: "En revision",
  payed: "Pagado",
};

export const PRStates = {
  pedido: "Pedido",
  aprobado: "Aprobado",
  enRevision: "En Revision",
  rechazado: "Rechazado",
  reembolsado: "Reembolsado",
  desestimado: "Desestimado",
};

export const POStates = {
  pedido: "Pedido",
  enRevision: "En Revision",
  aprobado: "Aprobado",
  resuelto: "Resuelto",
  demorado: "Demorado",
};

export const userTypes = {
  architect: "Arquitecto",
  contractor: "Contratista",
  admin: "Administrativo",
};

//Constructors
const contextConstructor = {
  [entities.obra]: null,
  [entities.rubro]: null,
  [commonAttrs.tarea]: null,
};

const attrsObligatorios = (type) => {
  return {
    [commonAttrs.type]: type,
    [commonAttrs.id]: null,
    [commonAttrs.nombre]: null,
    [commonAttrs.fechaCreacion]: null,
    [commonAttrs.fechaEdicion]: null,
    [commonAttrs.creadoPor]: null,
    [commonAttrs.editadoPor]: null,
  };
};

export const getEmptyConstructor = (type) => {
  switch (type) {
    case entities.obra:
      return {
        ...attrsObligatorios(entities.obra),
        [commonAttrs.propietario]: null,
        [commonAttrs.direccion]: null,
        [commonAttrs.enabled]: true,
      };
    case entities.rubro:
      return {
        ...attrsObligatorios(entities.rubro),
        [commonAttrs.enabled]: true,
      };
    case entities.user:
      return {
        [commonAttrs.type]: type,
        [commonAttrs.id]: null,
        [commonAttrs.nombre]: null,
        [commonAttrs.apellido]: null,
        [commonAttrs.email]: null,
        [commonAttrs.firebaseID]: null,
      };
    case entities.jornal:
      return {
        ...attrsObligatorios(entities.jornal),
        ...contextConstructor,
        [commonAttrs.diasHombre]: null,
      };
    case entities.pReintegro:
      return {
        ...attrsObligatorios(entities.pReintegro),
        ...contextConstructor,
        [commonAttrs.descripcion]: null,
        [commonAttrs.monto]: null,
      };
    case entities.pedidoDeObra:
      return {
        ...attrsObligatorios(entities.pedidoDeObra),
        ...contextConstructor,
        [commonAttrs.tipoPedidoObra]: null,
        [commonAttrs.status]: null,
        [commonAttrs.descripcion]: null,
      };
  }
};
