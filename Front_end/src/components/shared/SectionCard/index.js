import React, { useState, useEffect } from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControlLabel,
  Switch,
  Button
} from "@material-ui/core";

import { ExpandMore } from "@material-ui/icons";

import clsx from "clsx";
import { useSectionCardStyles } from "styles/commonStyles";

import "./sectionCard.scss";

function SectionCard(props) {
  let classes = useSectionCardStyles();
  let [expand, setExpand] = useState(true);
  let [isExpansionPanel, setExpansionPanel] = useState(false);

  useEffect(init, []);

  function init() {
    setExpansionPanel(props.isExpansionPanel);
  }

  function handleExpansion() {
    if (isExpansionPanel) {
      setExpand((expandState) => !expandState);
    }
  }
  return (
    <ExpansionPanel
      elevation={4}
      expanded={expand}
      className={clsx(
        "section-card",
        classes.cardContainer,
        props.className,
        props.fullwidth ? classes.w100p : ""
      )}
      onChange={handleExpansion}
      key={props.key && props.key}
    >
      {props.title && (
        <ExpansionPanelSummary
          className={clsx(classes.cardHeader, props.bg ? "bg" : "")}
          expandIcon={isExpansionPanel && <ExpandMore />}
        >
          <div className={classes.headerContent}>
            <Typography variant="h6">{props.title}</Typography>
            {props.isConditional && (
              <FormControlLabel
                control={
                  <Switch
                    checked={props.conditionState}
                    onChange={props.onConditionChange}
                    color="primary"
                  />
                }
                label={props.conditionLabel}
                labelPlacement="end"
                name="is-submenu"
              />
            )}
            {props.isActionAvailable && (
              <Button
                name="publish"
                color="primary"
                variant="contained"
                size="medium"
                style={{
                  height: "30px"
                }}
                onClick={props.handleAction}
              >
                {props.actionLabel}
              </Button>
            )}
          </div>
        </ExpansionPanelSummary>
      )}
      <ExpansionPanelDetails
        className={clsx(props.nopadding ? classes.noPadding : classes.details, {
          [classes.panelBg]: props.isBg || ""
        })}
      >
        {props.children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default SectionCard;
