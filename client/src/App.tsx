import { Provider } from "react-redux";

// router
import { BrowserRouter } from "react-router-dom";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RoleRoutes from "./rbac/RoleRoutes";

import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <RoleRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
