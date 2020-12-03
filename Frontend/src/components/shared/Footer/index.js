import React from "react";

import { Paper } from "@material-ui/core";
import "./footer.scss";

const Footer = () => {
  return (
    <>
      <Paper square className="app-footer text-black-50">
        <div className="app-footer--inner">
          <span>Click & Go © 2020</span>
        </div>
      </Paper>
    </>
  );
};
export default Footer;
