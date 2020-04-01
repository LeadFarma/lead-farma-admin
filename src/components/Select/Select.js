import React, { useEffect } from "react";
import { useForm } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import SelectIU from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Select(props) {
  const { helperText, source, choices = [] } = props;
  const classes = useStyles();
  const form = useForm();

  const [value, setValue] = React.useState("");

  const handleChange = event => {
    console.log(source, event.target.value);
    setValue(event.target.value);
    form.change(source, value);
  };

  // const handleChange = event => {
  //   const value = event.target.value;
  //   form.change(source, value);
  // };

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        optionText="full_name"
        // value={value}
        // inputProps={{
        //   name: "name",
        //   id: "uncontrolled-native"
        // }}
        onChange={handleChange}
      >
        <option value="" />
        {choices.map(choice => (
          <option value={choice.value}>{choice.key}</option>
        ))}
      </NativeSelect>
      {/* //   <FormHelperText>Uncontrolled</FormHelperText> */}
    </FormControl>
  );
}
