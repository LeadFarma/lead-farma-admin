import React from "react";
import { Admin, Resource } from "react-admin";

import ProductList from "./pages/Product/product-list";
// import ConcursoEdit from "./pages/Concurso/concurso-edit";
import ConcursoCreate from "./pages/Concurso/ConcursoCreate";
import ConcursoShow from "./pages/Concurso/concurso-show";

import UserList from "./pages/User/user-list";
import UserEdit from "./pages/User/user-edit";
import UserCreate from "./pages/User/user-create";
import UserShow from "./pages/User/user-show";

import ContatoList from "./pages/Contato/contato-list";

import PendenciaList from "./pages/Pendencia/pendencia-list";
import PendenciaShow from "./pages/Pendencia/pendencia-show";
import PendenciaEdit from "./pages/Pendencia/pendencia-edit";

import './style.scss'
import dataProvider from "./services/data-provider";
import authProvider from './services/auth-provider';
import TimeList from "./pages/Times/time-list";
import TimeCreate from "./pages/Times/time-create";

function App() {
  return (
    <>
      <Admin dataProvider={dataProvider()} authProvider={authProvider}>
        <Resource
          name="products"
          list={ProductList}
          // edit={ConcursoCreate}
          // create={ConcursoCreate}
          // show={ConcursoShow}
        />
        {/* <Resource
          name="user"
          list={UserList}
          edit={UserEdit}
          show={UserShow}
          create={UserCreate}
        />
        <Resource
          name="contato"
          list={ContatoList}
        />
        <Resource
          name="pendencias"
          list={PendenciaList}
          show={PendenciaShow}
          edit={PendenciaEdit}
        />
        <Resource 
          name="time"
          list={TimeList}
          create={TimeCreate}
        /> */}
        {/* <Resource
          name="time"
          list={TimeList}
        /> */}
      </Admin>
    </>
  );
}

export default App;


