import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./context/store";

export const Root = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
