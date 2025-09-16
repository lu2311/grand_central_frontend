import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // solo si tienes estilos específicos en src/

// Inicializa WOW.js
import { WOW } from "wowjs";
new WOW().init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
