import React from "react";
import {
  Datagrid,
  List,
  TextField,
  Filter,
  TextInput,
  DateField,
  CardActions,
  RefreshButton
} from "react-admin";
import ContatoShow from "./contato-show";

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label="Buscar" source="email" alwaysOn />
  </Filter>
);

const CustomActions = () => (
  <CardActions>
    <RefreshButton />
  </CardActions>
);

const UserList = props => {
  return (
    <List
      bulkActionButtons={false}
      {...props}
      filters={<UserFilter />}
      actions={<CustomActions />}
    >
      <Datagrid expand={<ContatoShow />}>
        <DateField source="data_envio" label="Data envio" />
        <TextField source="email" label="Email" />
        <TextField source="nome" label="Nome" />
        <TextField source="assunto" label="Assunto" />
      </Datagrid>
    </List>
  );
};

export default UserList;
