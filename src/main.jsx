import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <App />
      </AdminProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
