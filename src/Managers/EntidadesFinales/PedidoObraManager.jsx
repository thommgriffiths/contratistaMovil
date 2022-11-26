import {
  createFSElement,
  getFSCollection,
  deleteFSElement,
  updateFSElement,
  getFSCollectionAsync,
} from "../Firebase/FirebaseFirestoreManager";

import { entities } from "../../Core/util/entities";

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

export const getAllPedidosObraAsync = async () => {
  const result = await getFSCollectionAsync(currentType);
  return result;
};

export const deletePedidoDeObra = (id, onSuccess) => {
  deleteFSElement(currentType, id, onSuccess);
};

export const updatePedidosDeObra = (id, element, onSuccess) => {
  updateFSElement(currentType, id, element, onSuccess);
};
