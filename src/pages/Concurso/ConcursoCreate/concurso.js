import React from "react";
import {
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core/";

const classes = {
  textField: {
    minWidth: 150
  }
};

const CustomTableCell = props => {
  return <TableCell style={{ paddingRight: 0 }}>{props.children}</TableCell>;
};

const CustomTableHeader = props => {
  return <TableCell style={{ fontSize: "16px" }}>{props.children}</TableCell>;
};

export default function Concurso(props) {
  const { handleChange, concurso } = props;

  return (
    <div>

    <Table style={{width: "initial"}}>
      <TableHead>
        <TableRow >
          <CustomTableHeader>Premiação</CustomTableHeader>
          <CustomTableHeader>Data Inicial</CustomTableHeader>
          <CustomTableHeader>Data Fim</CustomTableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
        <CustomTableCell>
          <TextField
            value={concurso.premiacao}
            style={classes.textField}
            margin="normal"
            onChange={handleChange}
            name="premiacao"
          />
        </CustomTableCell>
        <CustomTableCell>
          <TextField
            value={concurso.data_inicio}
            type="datetime-local"
            style={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleChange}
            name="data_inicio"
          />
        </CustomTableCell>
        <CustomTableCell>
          <TextField
            value={concurso.data_fim}
            type="datetime-local"
            style={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleChange}
            name="data_fim"
          />
        </CustomTableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
  );
}
