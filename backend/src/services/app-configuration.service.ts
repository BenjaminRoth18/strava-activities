import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigurationService {
  constructor(private readonly configSerice: ConfigService) {}

  get apiPath(): string {
    return this.configSerice.get<string>('strava_api_path');
  }

  get baseUrl(): string {
    return this.configSerice.get<string>('strava_base_url');
  }

  get clientId(): string {
    return this.configSerice.get<string>('client_id');
  }

  get clientSecret(): string {
    return this.configSerice.get<string>('client_secret');
  }
}
