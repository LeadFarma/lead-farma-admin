import React from "react";
import { DateInput } from "react-admin";
import { useForm } from "react-final-form";
import { convertLocalToUtc } from "../../helpers/date-time";

export default function Input(props) {
  const { source } = props;
  const form = useForm();

  const handleChange = event => {
    form.change(source, convertLocalToUtc(event.target.value));
  };

  return (
    <DateInput
      InputLabelProps={{
        shrink: true
      }}
      {...props}
      onChange={handleChange}
    />
  );
}
