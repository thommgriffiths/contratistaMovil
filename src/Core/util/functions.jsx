import { getAllObras } from "../../Managers/DatosMaestros/ObraManager";
import { getAllRubros } from "../../Managers/DatosMaestros/RubroManager";
import { tiposPedidosDeObra } from "./mockFunctions";
import {
  getFSElementById,
  deleteFSElement,
  updateFSElement,
} from "../Firebase/FirebaseFirestoreManager";
import { entities, entitiesAttr, getEmptyConstructor } from "./entities";

//Obtengo fecha y hora en un formato legible y comun
export const getCurrentDateTime = () => {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  return `${year}/${month}/${day}-${date.toTimeString().slice(0, 5)}`;
};

//------------------------------------------------------------------------
//Firestore CRUD - Delete
export const deleteElement = (item, onSuccess) => {
  deleteFSElement(item.type, item.id, onSuccess);
};
//Firestore CRUD - Update
export const updateElement = (item, onSuccess) => {
  updateFSElement(item.type, item.id, item, onSuccess);
};

//------------------------------------------------------------------------
//Revisa un array de items traidos desde la base
//Si alguna propiedad es entity, la completa con sus datos
export const completeElements = async (elements = []) => {
  let result = [];
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];

    for (const key in element) {
      if (entities[key]) {
        const object = await getFSElementById(
          key,
          element[key][entitiesAttr.id]
        );
        element[key] = {
          [entitiesAttr.id]: element[key][entitiesAttr.id],
          ...object,
        };
      }
    }
    result.push(element);
  }
  return result;
};

//Funcion opuesta a completeElements
//Si alguna propiedad del item es entity, deja solo su id
export const cleanElement = (element) => {
  for (const key in entities) {
    element[entities[key]]
      ? (element[entities[key]] = {
          [entitiesAttr.id]: element[entities[key]][entitiesAttr.id],
        })
      : {};
  }
  return element;
};

//------------------------------------------------------------------------

//Dado un tipo de elemento, lo busca en firestore y los prepara para
//ser desplegados en un dropdown
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
    case entities.obra:
      getAllObras(onSuccess);
      break;
    case entities.rubro:
      getAllRubros(onSuccess);
      break;
    default:
      console.log("No se encontro la categoria" + type);
      return [];
  }
};

//Dado un item y las propiedades que quiero desplegar
//lo prepara como {key - value} para desplegar en detalles.
//Devuelve solo con las propiedades pedidas y en ese orden.
export const formatToDisplay = (item = {}, propertiesToDisplay = []) => {
  let result = [];
  propertiesToDisplay.forEach((key) => {
    if (!item[key]) return;

    entities[key]
      ? result.push({ key: key, value: item[key][entitiesAttr.label] })
      : result.push({ key: key, value: item[key] });
  });

  return result;
};

//------------------------------------------------------------------------

//Dados dos objetos, uno editado y uno original, los fusiona
export const fuzeItems = (newItem, oldItem) => {
  let fuzedItem = getEmptyConstructor(oldItem.type);
  for (const key in fuzedItem) {
    newItem[key] && !(newItem[key] == "" || newItem[key] == {})
      ? (fuzedItem[key] = newItem[key])
      : (fuzedItem[key] = oldItem[key]);
  }
  console.log(fuzedItem);
  return fuzedItem;
};
