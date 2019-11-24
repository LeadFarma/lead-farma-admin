import {API} from "aws-amplify"

import config from "../config/constants"


export const updateConcurso = (concurso) => {
    const options = {
        body: concurso
    }
    return API.put(config.APIS.BOLAOABBR_ADMIN, `concurso/${concurso.concurso.entity_id}`, options);
}

export const createConcurso = (concurso) => {
    const options = {
        body: concurso
    }
    return API.post(config.APIS.BOLAOABBR_ADMIN, "concurso", options);
}

export const getTimes = () => {
    return API.get(config.APIS.BOLAOABBR_ADMIN, "time?pagination_page=1&pagination_perPage=1000");
}

export const getConcursoById = id => {
    return API.get(config.APIS.BOLAOABBR_ADMIN, "concurso/" + id);
}

export const computaConcurso = id => {
    const options = {
        body: {}
    }
    return API.post(config.APIS.BOLAOABBR_ADMIN, "computa_premios/" + id, options);
}