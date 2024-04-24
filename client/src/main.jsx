import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { AxiosProvider } from "./context/AxiosContext.jsx";
import { Toaster } from "./components/ui/toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <AxiosProvider>
        <App />
        <Toaster />
      </AxiosProvider>
    </CookiesProvider>
  </React.StrictMode>
);
