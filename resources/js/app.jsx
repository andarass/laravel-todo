import React from "react";
import ReactDOM from "react-dom/client";
import TaskApp from "./components/TaskApp";
import "../css/app.css";

const root = document.getElementById("app");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <TaskApp />
    </React.StrictMode>
  );
}