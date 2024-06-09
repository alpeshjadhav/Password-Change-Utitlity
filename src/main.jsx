import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserAuthProvider } from "./store/UserAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthProvider>
      <App />
    </UserAuthProvider>
  </React.StrictMode>
);
