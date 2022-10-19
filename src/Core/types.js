export const entities = {
  obra: "obra",
  jornal: "jornal",
  pedidoReintegro: "pedidoReintegro",
  pedidoDeObra: "pedidoDeObra",
};

export const emptyConstructor = (type) => {
  switch (type) {
    case entities.obra:
      return {
        Nombre: "",
        Propietario: "",
        Direccion: "",
      };
  }
};
