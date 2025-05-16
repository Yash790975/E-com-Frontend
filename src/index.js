// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";

// (Optional) scroll restoration, toaster, etc.
// import ScrollToTop from "./components/ScrollToTop";
// import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* <ScrollToTop> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* <Toaster /> */}
    {/* </ScrollToTop> */}
  </BrowserRouter>
);
