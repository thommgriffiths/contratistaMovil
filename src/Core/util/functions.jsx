import { tiposPedidosDeObra } from "./mockFunctions";
import {
  getFSElementById,
  deleteFSElement,
  updateFSElement,
  getFSCollection,
} from "../Firebase/FirebaseFirestoreManager";
import { entities, commonAttrs, getEmptyConstructor } from "./entities";

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
      if (!entities[key]) continue;
      if (!element?.[key]?.[commonAttrs.id]) continue;

      const object = await getFSElementById(key, element[key][commonAttrs.id]);
      object[commonAttrs.id] = element[key][commonAttrs.id];
      element[key] = object;
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
          [commonAttrs.id]: element[entities[key]][commonAttrs.id],
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
      getFSCollection(entities.obra, onSuccess);
      break;
    case entities.rubro:
      getFSCollection(entities.rubro, onSuccess);
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
      ? result.push({ key: key, value: item[key][commonAttrs.nombre] })
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

export const getNonEmptyKeysAndValues = (object) => {
  let keyValues = {};

  for (const key in object) {
    if (object[key] == "" || object[key] == {} || !object[key]) continue;

    keyValues[key] = object[key];
  }

  return keyValues;
};

export const createQuery = (object) => {
  let query = [];

  for (const key in object) {
    if (object[key] == "" || object[key] == {} || !object[key]) continue;

    let queryObject = {};

    switch (key) {
      case commonAttrs.type:
        continue;
      case commonAttrs.tipoPedidoObra:
        continue;
      case commonAttrs.status:
        continue;
      case commonAttrs.descripcion:
        continue;
      case commonAttrs.fechaCreacion:
        continue;
      case commonAttrs.fechaEdicion:
        continue;
      case commonAttrs.creadoPor:
        continue;
      case commonAttrs.editadoPor:
        continue;
      case commonAttrs.nombre:
        continue;

      case commonAttrs.tarea: {
        queryObject["parameter"] = commonAttrs.tarea;
        queryObject["operator"] = "==";
        queryObject["value"] = object[key];
        break;
      }

      case entities.obra: {
        queryObject["parameter"] = entities.obra;
        queryObject["operator"] = "==";
        queryObject["value"] = { [commonAttrs.id]: object[key] };
        break;
      }

      case entities.rubro: {
        queryObject["parameter"] = entities.rubro;
        queryObject["operator"] = "==";
        queryObject["value"] = { [commonAttrs.id]: object[key] };
        break;
      }
    }
    query.push(queryObject);
  }

  return query;
};
