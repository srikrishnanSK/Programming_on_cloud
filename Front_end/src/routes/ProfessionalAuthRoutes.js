import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProfessionalAuthRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") &&
        localStorage.getItem("profileCompleted") &&
        localStorage.getItem("serviceType") === "PROF" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/profile/basic",
            }}
          />
        )
      }
    />
  );
};

export default ProfessionalAuthRoutes;
