var spanishLabels = {};

spanishLabels["casita"] = "nada nuevo";

spanishLabels["Status"] = "Estatus";
spanishLabels["User"] = "Usuario";
spanishLabels["Descripcion"] = "Descripción";
spanishLabels["obra"] = "Obra";
spanishLabels["rubro"] = "Rubro";

export const label = (key) => {
  return spanishLabels[key];
};
