import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { storeInterface } from "./Store/StoreInterface";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={storeInterface}>
      <App />
    </Provider>
  </React.StrictMode>
);
