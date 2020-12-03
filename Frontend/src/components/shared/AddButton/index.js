import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

import "./addButton.scss";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    // backgroundColor: theme.palette.common.white,
    backgroundColor: "#28619e",
    color: "#fff ",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const AddButton = (props) => {
  return (
    <>
      <LightTooltip title={`Create ` + props.title}>
        <div className="add-btn" onClick={props.onClick}>
          <Add />
        </div>
      </LightTooltip>
    </>
  );
};

export default AddButton;
