// pages
import { Login, Register, NotFound, Signin, Signup } from "../../pages";

const AUTH_ROUTES = [
  {
    path: "/auth",
    routes: [
      {
        path: "/auth/login",
        name: "login",
        icon: null,
        component: Login,
        isSidebarMenu: false,
      },
      {
        path: "/auth/register",
        name: "register",
        icon: null,
        component: Register,
        isSidebarMenu: false,
      },
      {
        path: "*",
        name: "not_found",
        icon: null,
        component: NotFound,
        isSidebarMenu: false,
      },
    ],
  },
];

export default AUTH_ROUTES;
