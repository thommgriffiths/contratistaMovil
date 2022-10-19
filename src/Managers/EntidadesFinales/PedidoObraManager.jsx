import {
  createFSElement,
  getFSCollection,
  deleteFSElement,
  updateFSElement,
} from "../Firebase/FirebaseFirestoreManager";

import { entities } from "../../Core/types";

const currentType = entities.pedidoDeObra;

export const PedidoDeObraConstructor = (obra, rubro, descripcion) => {
  return {
    Obra: obra,
    Rubro: rubro,
    Descripcion: descripcion,
  };
};

export const createPedidoDeObra = (element, onSuccess) => {
  createFSElement(currentType, element, onSuccess);
};

export const getAllPedidosDeObras = (onSuccess) => {
  getFSCollection(currentType, onSuccess);
};

export const deletePedidoDeObra = (id, onSuccess) => {
  deleteFSElement(currentType, id, onSuccess);
};

export const updatePedidosDeObra = (id, element, onSuccess) => {
  updateFSElement(currentType, id, element, onSuccess);
};
