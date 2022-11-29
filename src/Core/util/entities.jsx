//Los entities deben ser si o si un objeto definido comun en mi modelo de datos.
//.Todos deben tener los atributos obligatorios especificados abajo
export const entities = {
  obra: "obra",
  rubro: "rubro",
  jornal: "jornal",
  pedidoReintegro: "pedidoReintegro",
  pedidoDeObra: "pedidoDeObra",
};
export const entitiesAttr = { id: "id", label: "Nombre", type: "type" };

export const commonVariables = {
  fecha: "Fecha",
  fechaCreacion: "FechaCreacion",
  fechaEdicion: "FechaEdicion",
  creadoPor: "CreadoPor",
  editadoPor: "EditadoPor",
  id: "id",
  type: "type",
  user: "User",
  status: "Status",
  descripcion: "Descripcion",
  tarea: "tarea",
  propietario: "Propietario",
  direccion: "Direccion",
};

//Constructors
const contextConstructor = {
  obra: null,
  rubro: null,
  tarea: null,
};

export const getEmptyConstructor = (type) => {
  switch (type) {
    case entities.obra:
      return {
        id: null,
        type: entities.obra,
        Nombre: null,
        Propietario: null,
        Direccion: null,
      };
    case entities.pedidoDeObra:
      return {
        id: null,
        type: entities.pedidoDeObra,
        TipoDePedido: null,
        User: null,
        Status: null,
        Fecha: null,
        Descripcion: null,
        ...contextConstructor,
      };
    case entities.rubro:
      return {
        id: null,
        Nombre: null,
        type: entities.rubro,
      };
  }
};
