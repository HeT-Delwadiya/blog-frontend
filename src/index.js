import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import RoutesManager from "./RoutesManager";
import { Provider } from 'react-redux';
import { store } from "./state/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
       <Provider store={store} >
              <RoutesManager />
       </Provider>
);
