import React from "react";
import {
  Dialog,
  Slide,
  Typography,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  DialogActions,
  CircularProgress
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./popup.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopUp(props) {
  return (
    <div className="dialog-content">
      <Dialog
        fullScreen={props.fullScreen}
        open={props.open}
        maxWidth={props.size}
        fullWidth={props.fullWidth}
        onClose={props.onClose}
        TransitionComponent={Transition}
      >
        <DialogTitle disableTypography className="header">
          <Typography component="span" variant="h6">
            {props.title}
          </Typography>
          <IconButton onClick={props.onClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content">
          {props.children}
        </DialogContent>
        {props.renderActions && (
          <DialogActions>{props.renderActions()}</DialogActions>
        )}
        {!props.isPreview && props.onSave && !props.renderActions && (
          <DialogActions>
            <Button color="primary" variant="contained" onClick={props.onSave}>
              {props.loading ? (
                <CircularProgress
                  color="white"
                  disableShrink
                  size={16}
                  thickness={4}
                />
              ) : (
                <>{props.actionLabel}</>
              )}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
//
