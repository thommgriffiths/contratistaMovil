import { tiposPedidosDeObra } from "./mockFunctions";
import {
  getFSElementById,
  deleteFSElement,
  updateFSElement,
  getFSCollection,
} from "../Firebase/FirebaseFirestoreManager";
import { entities, commonAttrs, getEmptyConstructor } from "./entities";

//------------------------------------------------------------------------
//FECHAS
//Obtengo fecha y hora en un formato legible y comun
export const getCurrentDateTime = () => {
  const date = new Date();
  /*
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  return `${year}/${month}/${day}-${date.toTimeString().slice(0, 5)}`;*/
  return date.getTime();
};

export const parseDate = (date) => {
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  return `${year}/${month}/${day}`;
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
      case commonAttrs.creadoPor: {
        queryObject["parameter"] = commonAttrs.creadoPor;
        queryObject["operator"] = "==";
        queryObject["value"] = object[key];
        break;
      }
      case commonAttrs.email: {
        queryObject["parameter"] = commonAttrs.email;
        queryObject["operator"] = "==";
        queryObject["value"] = object[key];
        break;
      }
      case commonAttrs.editadoPor:
        continue;
      case commonAttrs.nombre:
        continue;
      case commonAttrs.fechaCreacionRango: {
        if (!object[key]?.startDate) continue;
        if (!object[key]?.endDate) continue;
        let startDate = {
          ["parameter"]: commonAttrs.fechaCreacion,
          ["operator"]: ">=",
          ["value"]: object[key]?.startDate,
        };
        query.push(startDate);
        let endDate = {
          ["parameter"]: commonAttrs.fechaCreacion,
          ["operator"]: "<=",
          ["value"]: object[key]?.endDate,
        };
        query.push(endDate);
        continue;
      }

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

//---------------------------------------------------------------------------------------------------
//Funcion que ordena objetos por atributo:

export const sortElementsByCommonAttribute = (arr, attr, asc) => {
  //Me voy si el attr no esta definido
  //if (!(Object.values(commonAttrs).includes(attr) || Object.values(entities).includes(attr)))
  //return console.log("el atributo: " + attr + " no existe en common attrs");

  const value = (e) =>
    e?.[attr]?.[commonAttrs.nombre]
      ? e?.[attr]?.[commonAttrs.nombre]
      : e?.[attr];

  return arr.sort((a, b) => {
    if (value(a) < value(b)) {
      return asc ? -1 : 1;
    } else if (value(a) > value(b)) {
      return asc ? 1 : -1;
    } else {
      return 0;
    }
  });
};

//--------------------------
//obtener el inicio y el fin de la semana corriente:
export const getCurrentWeekDates = () => {
  var currentDate = new Date();
  //(0-6, with 0 being Sunday)
  var dayOfWeek = currentDate.getDay();

  var startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - dayOfWeek
  );
  var endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - dayOfWeek + 6
  );

  return {
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
  };
};

//convierte un objeto de objetos a un array de objetos para que sea apto flatlist
export const objectToArray = (object) => {
  return Object.keys(object).map((key) => {
    return {
      [key]: object[key],
    };
  });
};

export const sumInternalValues = (obj) => {
  let sum = 0;

  for (const key in obj) {
    if (typeof obj[key] === "object") {
      // If the property is an object, recursively call the function on it
      // and add the result to the sum.
      sum += sumInternalValues(obj[key]);
    } else {
      // Otherwise, add the value of the property to the sum.
      sum += obj[key];
    }
  }

  return sum;
};

export const MontoTotal = (items) => {
  if (items == []) return;
  return items.reduce((total, item) => {
    return total + parseInt(item.Monto);
  }, 0);
};
