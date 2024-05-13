import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pacient from "./components/pacient/Pacient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pacient",
    element: <Pacient />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
