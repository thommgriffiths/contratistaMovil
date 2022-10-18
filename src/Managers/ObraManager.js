import { createFSElement, getFSCollection, deleteFSElement, updateFSElement } from "./FirebaseFirestoreManager";

import { entities } from "../Core/types";

const currentType = entities.obra;

export const obraConstructor = (nombre, direccion, propietario) => {
    return {
        "Nombre" : nombre,
        "Propietario" : propietario,
        "Direccion" : direccion
    }    
}

export const createObra = (element, onSuccess) => {
    //console.log("paso por create obra");
    createFSElement(currentType, element, onSuccess);
}

export const getAllObras = (onSuccess) => {
    //console.log("paso por getall obras");
    getFSCollection(currentType, onSuccess);
}

export const deleteObra = (id, onSuccess) => {
    //console.log("paso por eliminar obra");
    deleteFSElement(currentType, id, onSuccess);
}

export const updateObra = (id, element, onSuccess) => {
    console.log("paso por actualizar obra");
    updateFSElement(currentType, id, element, onSuccess)
}
