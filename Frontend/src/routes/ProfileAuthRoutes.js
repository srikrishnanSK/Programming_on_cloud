import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProfileAuthRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") &&
        !localStorage.getItem("profileCompleted") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProfileAuthRoutes;
