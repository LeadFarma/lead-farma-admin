// in src/posts.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  FileField,
  FileInput,
  ImageField,
} from "react-admin";

const ClientFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

export const ClientList = (props) => (
  <List {...props} filters={<ClientFilter />}>
    <Datagrid>
      <TextField source="name" />
      <ImageField source="logo.src" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const ClientShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <ImageField source="logo.src" />
    </SimpleShowLayout>
  </Show>
);

export const ClientCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="facebookKey" />
      <TextInput source="whatsapp" />
      <TextInput source="phone" />
      <TextInput type="color" source="primaryColor" />
      <TextInput type="color" source="secondaryColor" />
      <FileInput source="logo" label="Logo">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Create>
);

export const ClientEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="facebookKey" />
      <TextInput source="whatsapp" />
      <TextInput source="phone" />
      <TextInput type="color" source="primaryColor" />
      <TextInput type="color" source="secondaryColor" />
      <FileInput source="logo" label="Logo">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);
