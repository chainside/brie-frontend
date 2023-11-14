import "./index.css";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/noto-sans";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/400-italic.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { theme } from "./theme"
import React from 'react';
import { store } from "./store/stms/saga";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);

reportWebVitals();
