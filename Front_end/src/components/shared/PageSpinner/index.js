import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

function PageSpinner({ isShowLoader }) {
  const classes = PageSpinnerStyles();
  return (
    <>
      {isShowLoader && (
        <div className={classes.backdrop}>
          <CircularProgress disableShrink size={24} thickness={4} />
        </div>
      )}
    </>
  );
}

const PageSpinnerStyles = makeStyles((theme) => ({
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: theme.zIndex.modal,
    backgroundColor: theme.palette.action.disabled,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default PageSpinner;
