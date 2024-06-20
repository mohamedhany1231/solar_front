import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import { DarkModeContext } from "./context/DarkModeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContext>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeContext>
  </React.StrictMode>,
);
