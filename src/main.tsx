import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import LoginProvider from "./context/loginContext";
import UserContextProvider from "./context/userContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <LoginProvider>
          <App />
        </LoginProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
