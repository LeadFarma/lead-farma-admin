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
  ReferenceInput,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  ArrayField,
  ReferenceField,
} from "react-admin";

const LandingFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="client" alwaysOn />
  </Filter>
);

export const LandingList = (props) => (
  <List {...props} filters={<LandingFilter />}>
    <Datagrid>
      <ReferenceField label="Cliente" source="client" reference="clients">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="Produto em destaque"
        source="highlight.product"
        reference="products"
      >
        <TextField source="name" />
      </ReferenceField>

      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const LandingShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField label="Cliente" source="client" reference="clients">
        <TextField source="name" />
      </ReferenceField>{" "}
      <ReferenceField
        label="Produto em destaque"
        source="highlight.product"
        reference="products"
      >
        <TextField source="name" />
      </ReferenceField>{" "}
      <TextField source="highlight.price" />
      <ArrayField source="products">
        <Datagrid>
          <ReferenceField label="Produto" source="product" reference="products">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="price" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

export const LandingCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Cliente"
        source="client"
        reference="clients"
        filterToQuery={(searchText) => ({ name: searchText })}
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput
        label="Produto em destaque"
        source="highlight.product"
        reference="products"
        filterToQuery={(searchText) => ({ name: searchText })}
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput
        source="highlight.price"
        label="Preço do produto em destaque"
      />
      <ArrayInput
        source="products"
        label="Lista de produtos"
        filterToQuery={(searchText) => ({ name: searchText })}
      >
        <SimpleFormIterator>
          <ReferenceInput
            label="Produto"
            source="product"
            reference="products"
            filterToQuery={(searchText) => ({ name: searchText })}
          >
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
          <TextInput source="price" label="Preço do produto" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export const LandingEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Cliente"
        source="client"
        reference="clients"
        filterToQuery={(searchText) => ({ name: searchText })}
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput
        label="Produto em destaque"
        source="highlight.product"
        reference="products"
        filterToQuery={(searchText) => ({ name: searchText })}
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput
        source="highlight.price"
        label="Preço do produto em destaque"
      />
      <ArrayInput source="products" label="Lista de produtos">
        <SimpleFormIterator>
          <ReferenceInput
            label="Produto"
            source="product"
            reference="products"
            filterToQuery={(searchText) => ({ name: searchText })}
          >
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
          <TextInput source="price" label="Preço do produto" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
