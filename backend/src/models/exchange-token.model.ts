export interface ExchangeTokenDto {
  authorizationCode: string;
  clientId: string;
  clientSecret: string;
}

export interface ExchangeTokenResponse {
  expiresAt: string;
  expiresIn: string;
  refreshToken: string;
  accessToken: string;
}
