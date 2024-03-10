import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { AppConfigurationService } from './app-configuration.service';

@Injectable()
export class TokenService {
  grantTypeMode = 'authorization_code';

  constructor(
    private readonly appConfigService: AppConfigurationService,
    private readonly httpService: HttpService,
  ) {}

  async exchangeToken(
    authorizationCode: string,
    clientId: string,
    clientSecret: string,
  ): Promise<AxiosResponse> {
    const requestUrl = `${this.appConfigService.baseUrl}/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${authorizationCode}&grant_type=${this.grantTypeMode}`;

    return await this.httpService.axiosRef.post(requestUrl);
  }
}
