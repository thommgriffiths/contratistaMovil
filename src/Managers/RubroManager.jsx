import {
  createFSElement,
  getFSCollection,
  deleteFSElement,
  updateFSElement,
} from "./FirebaseFirestoreManager";

import { entities } from "../Core/types";

const currentType = entities.rubro;

export const rubroConstructor = (nombre) => {
  return {
    Nombre: nombre,
  };
};

export const createRubro = (element, onSuccess) => {
  createFSElement(currentType, element, onSuccess);
};

export const getAllRubros = (onSuccess) => {
  getFSCollection(currentType, onSuccess);
};

export const deleteRubro = (id, onSuccess) => {
  deleteFSElement(currentType, id, onSuccess);
};

export const updateRubro = (id, element, onSuccess) => {
  updateFSElement(currentType, id, element, onSuccess);
};
