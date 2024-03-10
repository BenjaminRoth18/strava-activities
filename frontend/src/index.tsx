import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { RouterConfig } from "./RouterConfig";
import { ThemeProvider, createTheme } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          height: "100vh",
          background: darkTheme.palette.background.default,
        }}
      >
        <RouterProvider router={RouterConfig} />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
