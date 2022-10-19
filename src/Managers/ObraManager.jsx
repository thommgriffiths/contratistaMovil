import {
  createFSElement,
  getFSCollection,
  deleteFSElement,
  updateFSElement,
} from "./FirebaseFirestoreManager";

import { entities } from "../Core/types";

const currentType = entities.obra;

export const obraConstructor = (nombre, direccion, propietario) => {
  return {
    Nombre: nombre,
    Propietario: propietario,
    Direccion: direccion,
  };
};

export const createObra = (element, onSuccess) => {
  createFSElement(currentType, element, onSuccess);
};

export const getAllObras = (onSuccess) => {
  getFSCollection(currentType, onSuccess);
};

export const deleteObra = (id, onSuccess) => {
  deleteFSElement(currentType, id, onSuccess);
};

export const updateObra = (id, element, onSuccess) => {
  updateFSElement(currentType, id, element, onSuccess);
};
