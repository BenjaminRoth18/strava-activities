import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

export const AuthorizationCodeExchange: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const clientId = getFromLocalStorage("ClientId");
  const clientSecret = getFromLocalStorage("ClientSecret");

  useEffect(() => {
    async function fetchToken() {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const url = `${backendUrl}/token/exchange-token`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authorizationCode: code,
          clientId,
          clientSecret,
        }),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      const bearerToken = data.accessToken;

      if (bearerToken) {
        saveToLocalStorage("BearerToken", bearerToken);
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }

    fetchToken();
  });

  return <></>;
};
