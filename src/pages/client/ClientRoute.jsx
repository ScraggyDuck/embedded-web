import React from "react";
import { Redirect, Route } from "react-router-dom";

const ClientRoute = ({ component: Component, ...rest }) => {
  const clientToken = localStorage.getItem("client-token");
  return (
    <Route
      {...rest}
      render={(props) =>
        clientToken ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default ClientRoute;
