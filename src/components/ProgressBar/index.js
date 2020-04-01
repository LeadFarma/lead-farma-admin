import React from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    height: 10,
    backgroundColor: lighten(theme.palette.secondary.main, 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: theme.palette.secondary.main
  }
}))(LinearProgress);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function ProgressBar({ progress = 0 }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={progress}
      />
    </div>
  );
}
