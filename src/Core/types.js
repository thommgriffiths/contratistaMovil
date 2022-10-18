export const entities = {
  obra: "obra",
  jornal: "jornal",
  pedidoReintegro: "pedidoReintegro",
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
