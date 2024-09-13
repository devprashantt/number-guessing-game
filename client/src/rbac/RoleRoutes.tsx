// packages
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// roles routes
import { ROLE_ROUTES } from "./lib";

// constants
import SLICE_NAMES from "../constants/slices";

// @ts-ignore
import styles from "./RoleRoutes.module.scss";

const RoleRoutes = () => {
  const APP_USER = useSelector((state) => state[SLICE_NAMES.USER]);

  const AUTH_ROUTES = ROLE_ROUTES.auth[0].routes;
  // todo: refactor this user to dynamic
  const SIDEBAR_ROUTES = ROLE_ROUTES["user"][0].routes.filter(
    (route) => route.isSidebarMenu,
  );
  const NO_SIDEBAR_ROUTES = ROLE_ROUTES["user"][0].routes.filter(
    (route) => !route.isSidebarMenu,
  );

  return APP_USER ? (
    <main className={styles.body}>
      <Routes>
        {NO_SIDEBAR_ROUTES?.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
        <Route path="/*" element={<Navigate to={"/user/play_game"} />} />
      </Routes>
    </main>
  ) : (
    <main className={styles.auth}>
      <Routes>
        <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        {AUTH_ROUTES?.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
      </Routes>
    </main>
  );
};

export default RoleRoutes;
