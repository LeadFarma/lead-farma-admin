import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core/";
import AddBoxIcon from "@material-ui/icons/AddBox";
import classes from "./styles";
import "moment-timezone";

const CustomTableCell = props => {
  return <TableCell style={{ paddingRight: 0 }}>{props.children}</TableCell>;
};

const CustomTableHeader = props => {
  return <TableCell style={{ fontSize: "16px" }}>{props.children}</TableCell>;
};

export default function Jogos(props) {
  const {
    handleChange,
    addJogo,
    deleteJogo,
    jogos,
    times = [],
    isEditing
  } = props;

  return (
    <>
      <Table style={{ width: "initial" }}>
        <TableHead>
          <TableRow>
            <CustomTableHeader>Data Inicial</CustomTableHeader>
            <CustomTableHeader>Campeonato</CustomTableHeader>
            <CustomTableHeader>Mandante</CustomTableHeader>
            {isEditing && (
              <CustomTableHeader>Placar Mandante</CustomTableHeader>
            )}
            <CustomTableHeader>Visitante</CustomTableHeader>
            {isEditing && (
              <CustomTableHeader>Placar Visitante</CustomTableHeader>
            )}
            <CustomTableHeader></CustomTableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {jogos.map((jogo, index) => (
            <TableRow>
              <CustomTableCell>
                <TextField
                  value={jogo.data}
                  type="datetime-local"
                  style={classes.textField}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => handleChange(e, index)}
                  name="data"
                />
              </CustomTableCell>
              <CustomTableCell>
                <TextField
                  value={jogo.campeonato}
                  style={classes.textField}
                  margin="normal"
                  onChange={e => handleChange(e, index)}
                  name="campeonato"
                />
              </CustomTableCell>

              <CustomTableCell>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={classes.textField}
                  value={jogo.mandante}
                  onChange={e => handleChange(e, index)}
                  name="mandante"
                >
                  {times.length > 0 ? (
                    times.map((time, index) => (
                      <MenuItem key={index} value={time.nome}>
                        {time.nome}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={""}>Carregando...</MenuItem>
                  )}
                </Select>
              </CustomTableCell>
              {isEditing && (
                <CustomTableCell>
                  <TextField
                    type="number"
                    value={jogo.placar.mandante}
                    style={classes.textField}
                    margin="normal"
                    onChange={e => handleChange(e, index)}
                    name="placar.mandante"
                  />
                </CustomTableCell>
              )}
              <CustomTableCell>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={classes.textField}
                  value={jogo.visitante}
                  onChange={e => handleChange(e, index)}
                  name="visitante"
                >
                  {times.length > 0 ? (
                    times.map((time, index) => (
                      <MenuItem key={index} value={time.nome}>
                        {time.nome}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={""}>Carregando...</MenuItem>
                  )}
                </Select>
              </CustomTableCell>
              {isEditing && (
                <CustomTableCell>
                  <TextField
                    type="number"
                    value={jogo.placar.visitante}
                    style={classes.textField}
                    margin="normal"
                    onChange={e => handleChange(e, index)}
                    name="placar.visitante"
                  />
                </CustomTableCell>
              )}
              <CustomTableCell>
                <button
                  style={classes.deletar}
                  onClick={() => deleteJogo(index)}
                >
                  DELETAR
                </button>
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <button style={classes.newGame} onClick={addJogo}>
        <AddBoxIcon style={{ paddingRight: "5px" }} />
        NOVO JOGO
      </button>
    </>
  );
}
