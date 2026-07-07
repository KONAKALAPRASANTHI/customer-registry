import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ToastProvider } from "./components/Toast/toastContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Clerk Publishable Key missing.");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={clerkPubKey}>
        <ToastProvider>
          <App />
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </ToastProvider>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
