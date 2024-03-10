import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { saveToLocalStorage } from "../utils";

export const Login: React.FC = () => {
  const [clientId, setClientId] = React.useState<string | null>(null);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);

  const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
  const redirectUrl = `${frontendUrl}/authorization-code-exchange`;
  const authorizeUrl = `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&approval_prompt=force&scope=activity:read`;

  const handleClientIdInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setClientId(event.target.value);

  const handleClientSecretInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClientSecret(event.target.value);
  };

  const handleSaveToLocalStorage = () => {
    if (clientId && clientSecret) {
      saveToLocalStorage("ClientId", clientId);
      saveToLocalStorage("ClientSecret", clientSecret);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 12 }}>
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ pb: 5 }}>
          Authorize
        </Typography>
        <Stack spacing={1}>
          <Typography variant="h6">Enter your client ID</Typography>
          <TextField
            label="Client ID"
            variant="standard"
            onChange={handleClientIdInput}
            sx={{ pb: 5 }}
          />

          <Typography variant="h6">Enter your client secret</Typography>
          <TextField
            label="Client Secret"
            variant="standard"
            onChange={handleClientSecretInput}
            sx={{ pb: 5 }}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSaveToLocalStorage}
            href={authorizeUrl}
            disabled={!clientId || !clientSecret}
          >
            Authorize on Strava
          </Button>
        </Stack>
      </Container>
    </Container>
  );
};
