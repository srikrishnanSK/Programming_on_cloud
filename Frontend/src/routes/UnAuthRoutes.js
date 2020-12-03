import React from "react";
import { Route, Redirect } from "react-router-dom";

const UnAuthRoutes = ({ component: Component, ...rest }) => {
  let userData = localStorage.getItem("serviceType");
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("token") ? (
          <Component {...props} />
        ) : localStorage.getItem("token") &&
          !localStorage.getItem("profileCompleted") ? (
          <Redirect
            to={{
              pathname: "profile/basic",
              state: { from: props.location },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: `${
                userData === "USER"
                  ? "/user/search-results"
                  : userData === "PROF"
                  ? "/professional"
                  : ""
              }`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default UnAuthRoutes;
