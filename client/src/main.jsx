import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./store/auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </AuthProvider>
);
