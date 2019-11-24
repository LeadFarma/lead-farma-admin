import React from "react";
import {
  Create,
  SimpleForm,
  ImageInput,
  ImageField
} from "react-admin";

const TimeCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm>
      <ImageInput source="logo_url" label="Logo" accept="image/png">
          <ImageField source="logo_url" title="Logo" />
      </ImageInput>
      </SimpleForm>
    </Create>
  );
};

export default TimeCreate;
