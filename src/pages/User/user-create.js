import React from "react";
import {
  NumberInput,
  DateInput,
  Create,
  TabbedForm,
  FormTab,
  // SimpleForm,
  TextInput,
  DateTimeInput
} from "react-admin";

const ConcursoCreate = props => {
  return (
    <Create {...props}>
      <TabbedForm>
        <FormTab label="concurso">
          <NumberInput source="premiacao" label="Premiação" />
          <DateInput source="data_inicio" label="Data Início" />
          <DateInput source="data_fim" label="Data Fim" />
        </FormTab>
        <FormTab label="JOGOS">
          <TextInput source="mandante" label="Mandante" />
          <TextInput source="visitante" label="Visitante" />
          <TextInput source="campeonato" label="Campeonato" />
          <DateTimeInput source="data_inicio" label="Data Início" />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default ConcursoCreate;
