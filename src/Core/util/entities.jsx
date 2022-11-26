export const entities = {
  obra: "obra",
  rubro: "rubro",
  jornal: "jornal",
  pedidoReintegro: "pedidoReintegro",
  pedidoDeObra: "pedidoDeObra",
};

const contextConstructor = {
  obra: null,
  rubro: null,
};

export const getEmptyConstructor = (type) => {
  switch (type) {
    case entities.obra:
      return {
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
        Nombre: null,
      };
  }
};
