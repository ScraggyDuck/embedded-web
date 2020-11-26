import React from "react";
import ClientHome from "../pages/client/Home";
import ClientLogin from "../pages/client/ClientLogin";
import Admin from "../pages/admin/Admin";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminRegister from "../pages/admin/AdminRegister";
import AdminDetail from "../pages/admin/AdminDetail";

const routes = [
  {
    role: "client",
    path: "/",
    exact: true,
    main: ({ history, match }) => (
      <ClientHome history={history} match={match} />
    ),
  },
  {
    path: "/login",
    exact: true,
    main: ({ history, match }) => (
      <ClientLogin history={history} match={match} />
    ),
  },
  {
    role: "admin",
    path: "/admin",
    exact: true,
    main: ({ history, match }) => <Admin history={history} match={match} />,
  },
  {
    path: "/admin/login",
    exact: true,
    main: ({ history, match }) => (
      <AdminLogin history={history} match={match} />
    ),
  },
  {
    path: "/admin/detail/:id",
    exact: true,
    main: ({ history, match }) => (
      <AdminDetail history={history} match={match} />
    ),
  },
  {
    path: "/admin/register",
    exact: true,
    main: ({ history, match }) => (
      <AdminRegister history={history} match={match} />
    ),
  },
];

export default routes;
