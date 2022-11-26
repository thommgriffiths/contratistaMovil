import {
  createFSElement,
  getFSCollection,
  deleteFSElement,
  updateFSElement,
} from "../Firebase/FirebaseFirestoreManager";

import { entities } from "../../Core/util/entities";

const currentType = entities.pedidoReintegro;

export const PedidoReintegroConstructor = (obra, rubro, descripcion) => {
  return {
    Obra: obra,
    Rubro: rubro,
    Descripcion: descripcion,
  };
};

export const createPedidoReintegro = (element, onSuccess) => {
  createFSElement(currentType, element, onSuccess);
};

export const getAllPedidosReintegros = (onSuccess) => {
  getFSCollection(currentType, onSuccess);
};

export const deletePedidoReintegro = (id, onSuccess) => {
  deleteFSElement(currentType, id, onSuccess);
};

export const updatePedidosReintegro = (id, element, onSuccess) => {
  updateFSElement(currentType, id, element, onSuccess);
};
