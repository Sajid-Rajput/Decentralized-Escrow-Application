import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary";
import reportWebVitals from "./reportWebVitals";

const root = document.getElementById("root");
const rootContainer = ReactDOM.createRoot(root);

if (!window.ethereum) {
  rootContainer.render(
    <React.StrictMode>
      You need to install a browser wallet to build the escrow dapp
    </React.StrictMode>
  );
} else {
  rootContainer.render(
    <React.StrictMode>
      <ErrorBoundary>
          <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

reportWebVitals();
