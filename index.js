import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const logPerformance = (metric) => {
  console.info("Performance metric:", metric);
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import("web-vitals").then(({ getCLS, getFID, getLCP }) => {
  getCLS(logPerformance);
  getFID(logPerformance);
  getLCP(logPerformance);
});
