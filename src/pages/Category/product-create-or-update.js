import React from "react";
import {
  TextInput,
  BooleanInput,
  Create,
  SimpleForm,
  Toolbar,
  SaveButton,
  Edit,
  SelectInput,
  ReferenceInput
} from "react-admin";
// import Select from "../../components/Select/Select";

// import Upload from "../../components/Upload/Upload";
// import DateInput from "../../components/DateInput/DateInput";
// import { getUrl } from "../../services/file.service";
// import TransferList from "../../components/TransferList/TransferList";

const CustomToolbar = props => {
  return (
    <Toolbar {...props}>
      <SaveButton redirect={"list"} />
    </Toolbar>
  );
};

const ProductCreateOrUpdate = props => {
  const CreateOrEdit = props => {
    if (props.id) return <Edit title="Editar Produto" {...props} />;
    return <Create title="Criar Produto" {...props} />;
  };

  return (
    <CreateOrEdit title="Produto" {...props}>
      <SimpleForm
        toolbar={<CustomToolbar {...props} />}
        // initialValues={{ date: new Date() }}
      >
        {/* <Upload source="file_id" sourceName={"file_name"} getUrl={getUrl} /> */}
        <BooleanInput source="blackstripe" label="Tarja Preta" />
        <TextInput source="name" label="Nome" />
        <TextInput source="description" label="Descrição" />
        <TextInput source="ean13" label="Código de barras" />
        <TextInput source="image" label="Imagem" />
        <ReferenceInput
          label="Categoria"
          source="category_id"
          reference="categories"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        {/* <SelectInput
          source="category_id"
          choices={categories}
          translateChoice={false}
        /> */}
        {/* <DateInput source="date" label="Data" /> */}
        {/* <TransferList
            source="allowed_franchises"
            items={users}
            itemsSelected="allowed_franchises"
            defa
          /> */}
      </SimpleForm>
    </CreateOrEdit>
  );
};

export default ProductCreateOrUpdate;
