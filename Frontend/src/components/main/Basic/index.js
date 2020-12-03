import React, { useState } from "react";
import Card from "@material-ui/core/Card";

import "./basic.scss";
import { useHistory } from "react-router-dom";

export default function BasicProfile() {
  const history = useHistory();

  function navigate(e) {
    history.push(e);
  }
  return (
    <div className="steps">
      <Card className="title">
        <h4>Choose type of service</h4>
      </Card>
      <Card className="cardRoot">
        <div className="col-lg-6 col-md-6">
          <div className="p-5 black" onClick={() => navigate("/profile/user")}>
            User
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div
            className="p-5 blue"
            onClick={() => navigate("/profile/professional")}
          >
            Professional
          </div>
        </div>
      </Card>
    </div>
  );
}
