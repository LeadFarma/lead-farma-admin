import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  cellHead: {
    fontWeight: "bold"
  },
  rowColor: {
    backgroundColor: '#f1f1f1'
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline'
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const getStyles = (classes, index) => {
  return index%2 ? classes.rowColor : ""
}

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow className={classes.head}>
            <TableCell className={classes.cellHead} >Data última alteração </TableCell>
            <TableCell className={classes.cellHead} align="right">Descrição</TableCell>
            <TableCell className={classes.cellHead} align="right">Nº Arquivo</TableCell>
            <TableCell className={classes.cellHead} align="right">Arquivo</TableCell>
            <TableCell className={classes.cellHead} align="right">Opções</TableCell>
            <TableCell className={classes.cellHead} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name} className={getStyles(classes, index)}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right" className={classes.link}>Excluir</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}