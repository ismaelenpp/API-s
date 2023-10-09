/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import PantallaPrincipal from "./login/pantallaPrincipal.jsx"; // Verifica la ruta
import PantallaCodigo from "./login/pantallaCodigo.jsx";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PantallaPrincipal />,
  },
  {
    path: "/codigo",
    element: <PantallaCodigo />,
  },
  {
    path: "/app",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
