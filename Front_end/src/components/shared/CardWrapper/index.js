import React, { Component } from "react";

import { Card, CardContent } from "@material-ui/core";

export default class CardWrapper extends Component {
  render() {
    return (
      <Card className="card-box mb-4-spacing overflow-visible">
        <CardContent className="p-2">{this.props.children}</CardContent>
      </Card>
    );
  }
}
