import React from "react";
import { Admin, Resource } from "react-admin";

import ProductList from "./pages/Product/product-list";
import ProductCreateOrEdit from "./pages/Product/product-create-or-update";

import "./style.scss";
import dataProvider from "./services/data-provider";
// import authProvider from "./services/auth-provider";

function App() {
  return (
    <Admin dataProvider={dataProvider()}>
      {/* <Admin dataProvider={dataProvider()} authProvider={authProvider}> */}
      <Resource
        name="products"
        list={ProductList}
        edit={ProductCreateOrEdit}
        create={ProductCreateOrEdit}
        // show={ConcursoShow}
      />
      <Resource name="categories" />
      {/* <Resource
          name="user"
          list={UserList}
          edit={UserEdit}
          show={UserShow}
          create={UserCreate}
        />
      */}
    </Admin>
  );
}

export default App;
