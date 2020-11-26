import React from "react";
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  const adminToken = localStorage.getItem("admin-token");
  return (
    <Route
      {...rest}
      render={(props) =>
        adminToken ? <Component {...props} /> : <Redirect to='/admin/login' />
      }
    />
  );
};

export default AdminRoute;
