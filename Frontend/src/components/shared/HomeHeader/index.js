import React from "react";
import Button from "@material-ui/core/Button";

import "./header.scss";
import { useHistory } from "react-router-dom";

export default function HomeHeader() {
  const history = useHistory();
  function navigate(URL) {
    history.push(URL);
  }
  return (
    <div className="header header-home">
      <div className="header-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/21/Roscosmos-logo-main.png"
          height="70"
        />
      </div>
      <div className="header-inner">
        <Button className="active" onClick={() => navigate("register")}>
          Sign Up
        </Button>
        <Button onClick={() => navigate("login")}>Log In</Button>
      </div>
    </div>
  );
}
