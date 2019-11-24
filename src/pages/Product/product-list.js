import React from "react";

import {
  Datagrid,
  List,
  TextField,
  FunctionField,
  DeleteButton,
  EditButton,
  CardActions,
  CreateButton,
  RefreshButton
} from "react-admin";
import 'moment-timezone';
import Moment from 'react-moment';
import 'moment/locale/pt-br';
// import CustomDelete from "../../components/CustomDelete/CustomDelete";

const CustomActions = ({basePath}) => <CardActions>
                                          <CreateButton basePath={basePath} />
                                          <RefreshButton />
                                      </CardActions>

const ProductList = props => {
  return (
    <List bulkActionButtons={false} {...props} actions={<CustomActions />} >
      <Datagrid rowClick="show" >
      {/* {console.log(props)} */}
        <TextField source="entity_id" label="Concurso(ID)" />
        <FunctionField render={concurso=><Moment format={"DD/MM/YYYY HH:mm"}>{concurso.data_inicio}</Moment>} label="Início" />
        <FunctionField render={concurso=><Moment format={"DD/MM/YYYY HH:mm"}>{concurso.data_fim}</Moment>} label="Fim" />
        <FunctionField render={concurso => `R$ ${(concurso.premiacao/100).toFixed(2) || 0} `} label="Premiação" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ProductList;
