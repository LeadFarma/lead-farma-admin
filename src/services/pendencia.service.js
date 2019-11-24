import {API} from "aws-amplify"

import config from "../config/constants"


export const setStatus = (pendencia) => {
    const options = {
        body:{
            status: pendencia.status
        }
    }
    console.log("STATUS :: ", options)
    return API.post(config.APIS.BOLAOABBR_ADMIN, `solicitacao/${pendencia.entity_id}/status`, options);
}

export const getPendenciaById = id => {
    const options = {
        body: {}
    }
    return API.get(config.APIS.BOLAOABBR_ADMIN, "pendencias/" + id, options);
}