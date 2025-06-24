import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { storeInterface } from "./Store/StoreInterface";
import { BrowserRouter } from "react-router";
import Welcomer from "./Components/Welcomer/Welcomer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={storeInterface}>
      <BrowserRouter>
        <div className="index-parent">
          <Welcomer />
          <App />
          <div className="footer-credit">© All rights reserved  , Made By Abid Abed </div>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
