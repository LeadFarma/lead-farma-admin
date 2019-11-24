import React from "react";
import {
  BooleanField,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ArrayField,
  TabbedShowLayout,
  Show,
  Tab,
  SimpleShowLayout
} from "react-admin";

const UserEdit = props => {
  return (
    <>
      <div style={{ margin: "20px 0" }}>
        <Show {...props} title="Usuário" actions={<div />}>
          <SimpleShowLayout>
            <BooleanField source="is_admin" label="Admin" />
            <TextField source="entity_id" label="ID" />
            <NumberField source="_premio" label="Premiação" />
            <NumberField source="_saldo" label="Saldo" />
            <TextField source="email" label="Email" />
            <TextField source="data.nome" label="Nome" />
            <TextField source="data.nickname" label="Nickname" />
            <TextField source="data.genero" label="Gênero" />
            <TextField source="data.telefone" label="Telefone" />
            <TextField source="data.cep" label="Cep" />
            <TextField source="data.endereco" label="Endereco" />
            <TextField source="data.complemento" label="Complemento" />
            <TextField source="data.bairro" label="Bairro" />
            <TextField source="data.cidade" label="Cidade" />
            <TextField source="data.nascimento" label="Nascimento" />
            <TextField source="data.estado" label="Estado" />
            <TextField source="data.cpf" label="CPF" />
          </SimpleShowLayout>
        </Show>
      </div>

      <Show {...props} title=" " actions={<div />}>
        <TabbedShowLayout>
          <Tab label="Cartelas">
            <ArrayField source="cartela">
              <Datagrid>
                <TextField source="entity_id" label="ID" />
                <DateField source="concurso_data_inicio" label="Data Início" />
                <DateField source="concurso_data_fim" label="Data Fim" />
                {/* <ArrayField source="jogos">
                  <Datagrid>
                    <TextField source="entity_id" label="ID" />
                    <DateField source="data" label="Data" />
                    <TextField source="mandante" label="Mandante" />
                    <TextField source="visitante" label="Visitante" />
                    <TextField source="palpite" label="Palpite" />
                  </Datagrid>
                </ArrayField> */}
              </Datagrid>
            </ArrayField>
          </Tab>

          <Tab label="Compras">
            <ArrayField source="compras">
              <Datagrid>
                <TextField source="payment.reference_id" label="Referência" />
                <NumberField source="value" label="Valor" />
                <TextField source="payment.payment_type" label="Tipo" />
                <DateField source="purchase_datetime" label="Data" />
                <ArrayField source="payment.transactions">
                  <Datagrid>
                    <TextField source="status" label="Status" />
                    <DateField source="transaction_datetime" label="Data" />
                  </Datagrid>
                </ArrayField>
              </Datagrid>
            </ArrayField>
          </Tab>
        </TabbedShowLayout>
      </Show>
    </>
  );
};

export default UserEdit;
