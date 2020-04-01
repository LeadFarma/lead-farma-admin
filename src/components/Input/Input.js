import React from "react";
import { TextInput } from "react-admin";
import { useForm } from "react-final-form";
import { masks } from "../../helpers/masks";

export default function Input(props) {
  const { source } = props;
  const form = useForm();

  const handleChange = event => {
    const maskedValue = masks[props.type || "standard"](event.target.value);
    form.change(source, maskedValue);
  };

  return <TextInput {...props} onChange={handleChange} />;
}
