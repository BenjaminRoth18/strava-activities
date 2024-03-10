import { createBrowserRouter } from "react-router-dom";
import { Login } from "./components/Login";
import { AuthorizationCodeExchange } from "./components/AuthorizationCodeExchange";
import { Dashboard } from "./components/Dashboard";

export const RouterConfig = createBrowserRouter([
  {
    path: "/*",
    element: <Dashboard />,
  },
  {
    path: "authorization-code-exchange",
    element: <AuthorizationCodeExchange />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
