import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import SaveIcon from "@material-ui/icons/Save";
import {showNotification} from "ra-core"

import {
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core/";


import {
  getPendenciaById, setStatus
} from "../../services/pendencia.service";
import indexStyles from "./styles";
import Button from "../../components/Button";

const classes = {
  textField: {
    minWidth: 150,
    paddingRight: 20
  }
};

const listStatus = [
  {name: "Pendente", value: "PENDENTE"},
  {name: "Processando", value: "PROCESSANDO"},
  {name: "Pago", value: "PAGO"},
  {name: "Não Autorizado", value: "NAO_AUTORIZADO"},
  {name: "Informações Incorretas", value: "BAD_REQUEST"}
]

const CustomInput = props => {
 return <TextField 
          id="standard-read-only-input"
          defaultValue=" "
          style={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          value={props.value} 
          disabled 
          label={props.label}
        />
}

const PendenciaEdit = props => {
  const [pendencia, setPendencia] = useState({
    data_inicio: new Date().toISOString()
  });
  const [loading, setLoading] = useState(0);

  const incLoading = () => {
    setLoading(prevLoading => prevLoading + 1)
  }

  const decLoading = () => {
    setLoading(prevLoading => prevLoading - 1)
  }

  useEffect(() => {
    const concursoId = props.match.params.id;
    if (concursoId) {
      // setEditing(true);
      incLoading();
      getPendenciaById(concursoId)
        .then(res => {
          decLoading();
          setPendencia({
            ...res.data,
            status: res.data.status.pop().status
          });
         
        })
        .catch(error => decLoading());
    }
  }, [props.match.params.id]);

  const handleChange= e => {
    const { name, value } = e.target;
    setPendencia({
      ...pendencia,
      [name]: value
    });
  };

  const handleSetStatus = async () => {
    incLoading();
    try {
      await setStatus(pendencia);
      decLoading();
      props.showNotification("Status atualizado com sucesso");
      props.history.push("/pendencias");
    } catch (error) {
      decLoading();
      console.log(error)
      props.showNotification("Preencha os campos obrigatórios");
    }
  }

  return (
    <div>
      <div style={indexStyles.row}>
        <Button isLoading={!!loading} onClick={handleSetStatus} style={{ marginRight: "5px" }} >
          <SaveIcon style={{ paddingRight: "5px" }} />
          SAVE
        </Button>
       
      </div>
      <p style={indexStyles.heading}>Solicitação de Resgate de Prêmio</p>
      {/* <SimpleForm toolbar={<CustomToolbar />} > */}
        <CustomInput value={pendencia.agencia} label="Agencia" />
        <CustomInput value={pendencia.banco} label="Banco" />
        <CustomInput value={pendencia.conta} label="Conta" />
        <CustomInput value={pendencia.cpf} label="CPF" />
        <CustomInput value={pendencia.tipo_conta} label="Tipo de Conta" />
        <CustomInput value={pendencia.titular} label="titular" />
        <CustomInput value={pendencia.valor} label="Valor" />
        <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={classes.textField}
                  value={pendencia.status}
                  onChange={handleChange}
                  name="status"
                >
                  { listStatus.map((status, index) => (
                      <MenuItem key={index} value={status.value}>
                        {status.name}
                      </MenuItem>
                    ))
                  }
                </Select>
    </div>
  );
};

export default connect(state=>{
  console.log("STATE", state)
  return {
    state
  }
}, {showNotification})(PendenciaEdit);
