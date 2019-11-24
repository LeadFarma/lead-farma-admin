import React from "react";
import {
  Datagrid,
  List,
  TextField,
  EditButton,
  Filter,
  TextInput,
  CardActions,
  CreateButton,
  RefreshButton
} from "react-admin";

const UserFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Buscar" source="email" alwaysOn />
  </Filter>
);

const CustomActions = () => <CardActions>
                          <CreateButton />
                          <RefreshButton />
                      </CardActions>

const UserList = props => {
  return (
    <List bulkActionButtons={false} {...props} filters={<UserFilter />} actions={<CustomActions />} >
      <Datagrid rowClick="show">
        <TextField source="entity_id" label="ID" />
        <TextField source="email" label="Email" />
        <TextField source="data.nome" label="nome" />
        <EditButton />
      </Datagrid>

    </List>
  );
};

export default UserList;
