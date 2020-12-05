import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { ToasterStyles } from "styles/commonStyles";
import classNames from "classnames";
import { Close } from "@material-ui/icons";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function Toaster(props) {
  let classes = ToasterStyles();
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={3000}
      onClose={props.onClose}
      TransitionComponent={TransitionUp}
    >
      <div
        className={classNames(classes.root, {
          [classes.success]: props.type === "success",
          [classes.error]: props.type === "error"
        })}
      >
        <span>{props.message}</span>
        <Close onClick={props.onClose} />
      </div>
    </Snackbar>
  );
}
