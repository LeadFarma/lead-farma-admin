import React from "react";
import {
  Datagrid,
  List,
  TextField,
  Filter,
  TextInput,
  CardActions,
  RefreshButton,
  EditButton,
  ArrayField
} from "react-admin";

const UserFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Buscar por nome" source="nome" alwaysOn />
  </Filter>
);

const CustomActions = () => <CardActions>
                          <RefreshButton />
                      </CardActions>

const PendenciaList = props => {
  return (
    <List bulkActionButtons={false} {...props} filters={<UserFilter />} actions={<CustomActions />} >
      <Datagrid >
        <TextField source="titular" label="Titular" />
        <TextField source="cpf" label="CPF" />
        <ArrayField source="status" label=" ">
          <Datagrid>
            <TextField source="status" label="Status" />
          </Datagrid>
        </ArrayField>
        <EditButton />
      </Datagrid>

    </List>
  );
};

export default PendenciaList;
