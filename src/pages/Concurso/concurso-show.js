import React from "react";
import {connect} from "react-redux";

import {
  Datagrid,
  TextField,
  ArrayField,
  Show,
  FunctionField,
  SimpleShowLayout,
  ImageField
} from "react-admin";
import Moment from "react-moment";

const UserEdit = props => {
  return (
    <>
      <div style={{ margin: "20px 0" }}>
        <Show {...props} title="Concurso" actions={<div />}>
          <SimpleShowLayout>
            <TextField source="entity_id" label="Concurso(ID)" />          
            <FunctionField render={concurso=><Moment format={"DD/MM/YYYY HH:mm"}>{concurso.data_inicio}</Moment>} label="Início" />
            <FunctionField render={concurso=><Moment format={"DD/MM/YYYY HH:mm"}>{concurso.data_fim}</Moment>} label="Fim" />
            
            <FunctionField
              render={concurso =>
                `R$ ${(concurso.premiacao / 100).toFixed(2) || 0} `
              }
              label="Premiação"
            />
          </SimpleShowLayout>
        </Show>
      </div>

      {
        props.concurso[props.id] && props.concurso[props.id].ganhadores &&
          <div style={{ margin: "20px 0" }}>
            <Show {...props} title="Premiação" actions={<div />}>
              <SimpleShowLayout>
                <FunctionField
                  render={concurso =>
                    `R$ ${(concurso.ganhadores.premio_individual / 100).toFixed(2) || 0} `
                  }
                  label="Premiação"
                />
                <TextField source="ganhadores.acertos" label="Acertos" />          
                
                <ArrayField source="ganhadores.cartelas" label="Ganhadores">
                  <Datagrid>
                    <TextField source="nome" label="Nome" />
                    <TextField source="cartela_id" label="ID da Cartela" />
                    <TextField source="user_id" label="ID do usuário" />
                  </Datagrid>
                </ArrayField>
              </SimpleShowLayout>
            </Show>
          </div>
      }
      <Show {...props} title=" " actions={<div />}>
        <SimpleShowLayout>
              <FunctionField render={concurso=><Moment format={"DD/MM/YYYY HH:mm"}>{concurso.gabarito.vigencia}</Moment>} label="Vigência" />
              <ArrayField source="gabarito.jogos" label="Jogos">
                <Datagrid>
                  <FunctionField render={jogo=><Moment format={"DD/MM/YYYY HH:mm"}>{jogo.data}</Moment>} label="Início" />
                  <TextField source="campeonato" label="Campeonato" />
                  <ImageField source="logos.mandante" label="Logo" />
                  <TextField source="mandante" label="Mandante" />
                  <TextField source="placar.mandante" label="Placar" />
                  <ImageField source="logos.visitante" label="Logo" />
                  <TextField source="visitante" label="Visitante" />
                  <TextField source="placar.visitante" label="Placar" />
                </Datagrid>
              </ArrayField>
        </SimpleShowLayout>
      </Show>
    </>
  );
};

export default connect(state=>{
  return {
    concurso: (state.admin.resources.concurso && state.admin.resources.concurso.data) || {}
  }
}, {})(UserEdit)
