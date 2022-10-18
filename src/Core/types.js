export const entities = {
    "obra" : "obra",
    "jornal" : "jornal"
}

export const emptyConstructor = (type) => {
    switch(type){
        case entities.obra:
            return {
                "Nombre" : "",
                "Propietario" : "",
                "Direccion" : ""
            }
    }
}