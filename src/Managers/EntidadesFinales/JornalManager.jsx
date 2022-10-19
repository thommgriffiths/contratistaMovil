import {
  createFSElement,
  getFSCollection,
  deleteFSElement,
  updateFSElement,
} from "../Firebase/FirebaseFirestoreManager";

import { entities } from "../../Core/types";

const currentType = entities.jornal;

export const jornalConstructor = (obra, rubro, cantidad) => {
  return {
    Obra: obra,
    Rubro: rubro,
    Cantidad: cantidad,
  };
};

export const createJornal = (element, onSuccess) => {
  //console.log("paso por create Jornal");
  createFSElement(currentType, element, onSuccess);
};

export const getAllJornales = (onSuccess) => {
  //console.log("paso por getall Jornals");
  getFSCollection(currentType, onSuccess);
};

export const deleteJornal = (id, onSuccess) => {
  //console.log("paso por eliminar Jornal");
  deleteFSElement(currentType, id, onSuccess);
};

export const updateJornal = (id, element, onSuccess) => {
  console.log("paso por actualizar Jornal");
  updateFSElement(currentType, id, element, onSuccess);
};
