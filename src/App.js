import * as React from "react";
import {
  ProductList,
  ProductShow,
  ProductCreate,
  ProductEdit,
} from "./pages/Product";
import {
  ClientList,
  ClientShow,
  ClientCreate,
  ClientEdit,
} from "./pages/Client";
import {
  LandingList,
  LandingShow,
  LandingCreate,
  LandingEdit,
} from "./pages/Landing";
import { Admin, Resource } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from "react-admin-firebase";
import CustomLoginPage from "./CustomLoginPage";

import { firebaseConfig as config } from "./FIREBASE_CONFIG";

const options = {
  logging: true,
  rootRef: "root_collection/some_document",
};
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

class App extends React.Component {
  render() {
    return (
      <Admin
        loginPage={CustomLoginPage}
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        <Resource
          name="products"
          list={ProductList}
          show={ProductShow}
          create={ProductCreate}
          edit={ProductEdit}
        />
        <Resource
          name="clients"
          list={ClientList}
          show={ClientShow}
          create={ClientCreate}
          edit={ClientEdit}
        />
        <Resource
          name="landings"
          list={LandingList}
          show={LandingShow}
          create={LandingCreate}
          edit={LandingEdit}
        />
      </Admin>
    );
  }
}

export default App;
