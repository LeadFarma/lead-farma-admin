import React from "react";

import {
  Datagrid,
  List,
  TextField,
  // FunctionField,
  DeleteButton,
  EditButton,
  CardActions,
  CreateButton,
  RefreshButton
} from "react-admin";
import "moment-timezone";
// import Moment from "react-moment";
import "moment/locale/pt-br";
// import CustomDelete from "../../components/CustomDelete/CustomDelete";

const CustomActions = ({ basePath }) => (
  <CardActions>
    <CreateButton basePath={basePath} />
    <RefreshButton />
  </CardActions>
);

const CategoryList = props => {
  return (
    <List
      bulkActionButtons={false}
      title="Categorias"
      {...props}
      actions={<CustomActions />}
    >
      <Datagrid rowClick="show">
        <TextField source="_id" label="Produto(ID)" />
        <TextField source="name" label="Nome" />
        {/* <TextField source="description" label="Descrição" /> */}
        {/* <TextField source="category.name" label="Categoria" /> */}
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default CategoryList;
