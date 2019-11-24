import React from "react";
import {
  Edit,
  BooleanInput,
  TextField,
  NumberField,
  SimpleForm
} from "react-admin";
import CustomToolbar from "../../components/CustomToolbar/CustomToolbar";

const UserEdit = props => {
  return (
    <Edit title="Usuário" {...props}>
      <SimpleForm toolbar={<CustomToolbar />} >
        <BooleanInput source="is_admin" label="Admin" />
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
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
