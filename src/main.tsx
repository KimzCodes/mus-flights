import ReactDOM from "react-dom/client";
// redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
// router
import AppRoutes from "./routes/AppRoutes";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
// axios
import "./API/axios-global";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRoutes />
    </PersistGate>
  </Provider>
);
