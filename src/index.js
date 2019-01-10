import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route } from "react-router-dom";

import App from "./components/App";

import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./reducers";
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" exact component={App} />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
