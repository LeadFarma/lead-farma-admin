import React, { useEffect, useState } from "react";
import { useForm } from "react-final-form";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  List,
  Card,
  CardHeader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  Divider
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    display: "flex",
    flexWrap: "nowrap",
    width: "640px"
  },
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

function not(a, b) {
  return a.filter(
    itemA => !b.find(itemB => itemA.entity_id === itemB.entity_id)
  );
}

function intersection(a, b) {
  return a.filter(
    itemA => !!b.find(itemB => itemA.entity_id === itemB.entity_id)
  );
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function TransferList({ items, source = "list", itemsSelected }) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const form = useForm();

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    if (items && items.length > 0) {
      const itemsRight = form.getState().values[itemsSelected]
        ? form
            .getState()
            .values[itemsSelected].map(itemId =>
              items.find(item => item.entity_id === itemId)
            )
        : [];
      setRight(itemsRight);
      setLeft(not(items, itemsRight));
    }
  }, [items, itemsSelected, form]);

  useEffect(() => {
    const rightIds = right.map(item => item.entity_id);
    form.change(source, rightIds);
  }, [right, form, source]);

  const handleToggle = item => () => {
    const currentItem = checked.find(
      checkedItem => checkedItem.entity_id === item.entity_id
    );
    const newChecked = [...checked];

    if (!currentItem) {
      newChecked.push(item);
      setChecked(newChecked);
    } else {
      const checkedFiltered = newChecked.filter(
        checkedItem => checkedItem.entity_id !== item.entity_id
      );
      setChecked(checkedFiltered);
    }
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map(item => {
          const labelId = `transfer-list-all-item-${item.entity_id}-label`;

          return (
            <ListItem
              key={item.entity_id}
              role="listitem"
              button
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={
                    !!checked.find(
                      checkedItem => checkedItem.entity_id === item.entity_id
                    )
                  }
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList("Todas as Unidades", left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList("Unidades selecionadas", right)}</Grid>
    </Grid>
  );
}

export default TransferList;
