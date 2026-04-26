// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";

// App
import App from "./App";


// Global styles
import "./index.css";

// Leaflet map styles (required)
import "leaflet/dist/leaflet.css";

// Create React root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render application
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);