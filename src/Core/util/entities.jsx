//Los entities deben ser si o si un objeto definido comun en mi modelo de datos.
//.Todos deben tener los atributos obligatorios especificados abajo
export const entities = {
  obra: "obra",
  rubro: "rubro",
  jornal: "jornal",
  pedidoReintegro: "pedidoReintegro",
  pedidoDeObra: "pedidoDeObra",
};

export const commonAttrs = {
  //Obligarios
  id: "id",
  type: "type",
  nombre: "Nombre",

  //Otros
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
        Propietario: null,
        Direccion: null,
      };
    case entities.rubro:
      return {
        ...attrsObligatorios(entities.rubro),
      };
    case entities.pedidoDeObra:
      return {
        ...attrsObligatorios(entities.pedidoDeObra),
        ...contextConstructor,
        TipoDePedido: null,
        Status: null,
        Descripcion: null,
      };
  }
};
