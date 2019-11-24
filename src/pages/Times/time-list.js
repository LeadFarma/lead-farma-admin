import React from "react";
import {
  Datagrid,
  List,
  TextField,
  // EditButton,
  Filter,
  TextInput,
  CardActions,
  // CreateButton,
  RefreshButton,
  ImageField
} from "react-admin";

const UserFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Buscar" source="nome" alwaysOn />
  </Filter>
);

const CustomActions = () => <CardActions>
                                {/* <CreateButton basePath="/time" />  */}
                                <RefreshButton />
                            </CardActions>

const TimeList = props => {
  return (
    <List bulkActionButtons={false} {...props} filters={<UserFilter />} actions={<CustomActions />} >
      <Datagrid rowClick="show">
        <ImageField source="logo_url" label="Logo" />
        <TextField source="nome" label="nome" />
        {/* <EditButton /> */}
      </Datagrid>

    </List>
  );
};

export default TimeList;
