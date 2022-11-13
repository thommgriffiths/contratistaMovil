import { getAllObras } from "../../Managers/DatosMaestros/ObraManager";
import { getAllRubros } from "../../Managers/DatosMaestros/RubroManager";
import { tiposPedidosDeObra } from "./mockFunctions";
import { getFSElementById } from "../../Managers/Firebase/FirebaseFirestoreManager";
import { entities } from "../types";

export const getCurrentDateTime = () => {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  return `${year}/${month}/${day}-${date.toTimeString().slice(0, 5)}`;
};

export const completeElements = async (elements = []) => {
  let result = [];
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];

    for (const key in element) {
      if (entities[key]) {
        const object = await getFSElementById(key, element[key]);
        element[key + "Object"] = object;
      }
    }
    result.push(element);
  }
  return result;
};

export const obtenerDropdownItems = (type, setItems = () => {}) => {
  const prepareForDropdown = (element) => ({
    value: element.id,
    label: element.Nombre,
  });

  const onSuccess = (respuesta) => {
    let itemsForDropdown = [];
    respuesta.forEach((item) =>
      itemsForDropdown.push(prepareForDropdown(item))
    );
    setItems(itemsForDropdown);
  };

  switch (type) {
    case "tiposPedidosDePedidosObra":
      return tiposPedidosDeObra;
    case "obras":
      getAllObras(onSuccess);
      break;
    case "rubros":
      getAllRubros(onSuccess);
      break;
    default:
      console.log("No se encontro la categoria" + type);
      return [];
  }
};
