import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "./context/ThemeProvider";
import { CheckInProvider } from "./context/CheckInProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CheckInProvider>
        <App />
      </CheckInProvider>
    </ThemeProvider>
  </React.StrictMode>
);
