import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import SaveIcon from "@material-ui/icons/Save";
import ExtensionIcon from '@material-ui/icons/Extension';
import {showNotification} from "ra-core"
import Concurso from "./concurso";
import Jogos from "./jogos";
import {
  updateConcurso,
  createConcurso,
  getTimes,
  getConcursoById,
  computaConcurso
} from "../../../services/concurso.service";
import indexStyles from "./styles";
import Button from "../../../components/Button";
import { withRouter } from "react-router-dom";
import  * as DateTime from "../../../helpers/date-time"

const initialJogo = {
  data: "",
  campeonato: "",
  mandante: "",
  visitante: "",
  placar: {
    mandante: "",
    visitante: ""
  }
};

const ConcursoCreate = props => {
  const [concurso, setConcurso] = useState({
    data_inicio: new Date().toISOString()
  });
  const [jogos, setJogos] = useState([]);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(0);
  const [isEditing, setEditing] = useState(false);


  const incLoading = () => {
    setLoading(prevLoading => prevLoading + 1)
  }

  const decLoading = () => {
    setLoading(prevLoading => prevLoading - 1)
  }

  useEffect(() => {
    const concursoId = props.match.params.id;
    if (concursoId) {
      setEditing(true);
      incLoading();
      getConcursoById(concursoId)
        .then(res => {
          decLoading();
          setConcurso({
            ...res.data,
            data_inicio: DateTime.convertUtcToLocal(res.data.data_inicio),
            data_fim: DateTime.convertUtcToLocal(res.data.data_fim),
            premiacao: res.data.premiacao / 100
          });
          setJogos(
            res.data.gabarito.jogos.map(jogo => ({
              ...jogo,
              data: DateTime.convertUtcToLocal(jogo.data)
            }))
          );
        })
        .catch(error => decLoading());
    }
  }, [props.match.params.id]);

  useEffect(() => {
    incLoading();
    getTimes()
      .then(res => {
        setTimes(res.data);
        decLoading();
      })
      .catch(err => decLoading());
  }, []);

  const handleChangeConcurso = e => {
    const { name, value } = e.target;
    setConcurso({
      ...concurso,
      [name]: value
    });
  };

  const handleChangeJogo = (e, index) => {
    const { name, value } = e.target;

    const _jogos = Object.assign([], jogos);
    const nameSplit = name.split(".");
    if (nameSplit.length === 2) {
      _jogos.splice(index, 1, {
        ..._jogos[index],
        [nameSplit[0]]: {
          ..._jogos[index][nameSplit[0]],
          [nameSplit[1]]: value
        }
      });
    } else {
      _jogos.splice(index, 1, {
        ..._jogos[index],
        [name]: value
      });
    }
    setJogos(_jogos);
  };

  const addJogo = e => {
    e.preventDefault();
    setJogos([...jogos, initialJogo]);
  };

  const deleteJogo = index => {
    const _jogos = Object.assign([], jogos);
    _jogos.splice(index, 1);
    setJogos(_jogos);
  };

  const makeConcursoObj = () => {
    return {
      concurso: {
        ...concurso,
        data_inicio: DateTime.convertLocalToUtc(concurso.data_inicio),
        data_fim: DateTime.convertLocalToUtc(concurso.data_fim),
        premiacao: concurso.premiacao * 100,
        gabarito: {
          jogos: jogos.map(jogo => ({
            ...jogo,
            data: DateTime.convertLocalToUtc(jogo.data)
          }))
        }
      }
    };
  };

  const saveConcurso = async () => {
    const _concurso = makeConcursoObj();
    setLoading(true);
    console.log(_concurso)

    try {
      if(_concurso.concurso.entity_id)
        await updateConcurso(_concurso);
      else
        await createConcurso(_concurso);

      setLoading(false);
      props.history.push("/concurso");
    } catch (error) {
      console.log(error)
      setLoading(false);
      alert("Preencha os campos obrigatórios");
    }
  };

  const handleComputaConcurso = async () => {
    setLoading(true);
    try {
      if(window.confirm("A apuração é irreversível. Confira os resultados antes de confirmar.")){
        await computaConcurso(props.match.params.id);
        props.showNotification("Concurso apurado com sucesso!")
      }
        setLoading(false);
    } catch (error) {
      setLoading(false);
      props.showNotification("Ocorreu um erro. Preencha os campos obrigatórios")
    }
  };

  return (
    <div>
      <div style={indexStyles.row}>
        <Button isLoading={!!loading} onClick={saveConcurso} style={{ marginRight: "5px" }} >
          <SaveIcon style={{ paddingRight: "5px" }} />
          SAVE
        </Button>
        <Button isLoading={!!loading} onClick={handleComputaConcurso}>
          <ExtensionIcon style={{ paddingRight: "5px" }} />
          COMPUTAR PRÊMIO
        </Button>
      </div>
      <p style={indexStyles.heading}>Concurso</p>
      <Concurso concurso={concurso} handleChange={handleChangeConcurso} />

      <p style={indexStyles.heading}>Jogos</p>
      <Jogos
        deleteJogo={deleteJogo}
        isEditing={isEditing}
        handleChange={handleChangeJogo}
        times={times}
        jogos={jogos}
        addJogo={addJogo}
      />
    </div>
  );
};

export default connect(state=>{
  console.log("STATE :: ", state); 
  return state}, 
  {showNotification}
  )(withRouter(ConcursoCreate));
