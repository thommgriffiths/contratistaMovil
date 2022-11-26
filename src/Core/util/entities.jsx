export const entities = {
  obra: "obra",
  rubro: "rubro",
  jornal: "jornal",
  pedidoReintegro: "pedidoReintegro",
  pedidoDeObra: "pedidoDeObra",
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
        obra: null,
        rubro: null,
        TipoDePedido: null,
        User: null,
        Status: null,
        Fecha: null,
        Descripcion: null,
      };
    case entities.rubro:
      return {
        Nombre: null,
      };
  }
};
