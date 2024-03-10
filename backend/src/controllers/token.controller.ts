import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import {
  ExchangeTokenDto,
  ExchangeTokenResponse,
} from '../models/exchange-token.model';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('exchange-token')
  async exchangeToken(
    @Body() exchangeTokenRequest: ExchangeTokenDto,
  ): Promise<ExchangeTokenResponse> {
    const { authorizationCode, clientId, clientSecret } = exchangeTokenRequest;
    const response = await this.tokenService.exchangeToken(
      authorizationCode,
      clientId,
      clientSecret,
    );

    return {
      expiresAt: response.data.expires_at,
      expiresIn: response.data.expires_in,
      refreshToken: response.data.refresh_token,
      accessToken: response.data.access_token,
    };
  }
}
