import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { AppConfigurationService } from './app-configuration.service';
import { ActivityType } from 'src/models/get-athlete-activities.model';
@Injectable()
export class AthleteService {
  constructor(
    private readonly appConfigService: AppConfigurationService,
    private readonly httpService: HttpService,
  ) {}

  async getCyclingActivitiesByAthlete(
    accesstoken: string,
    after?: string,
    before?: string,
  ): Promise<AxiosResponse['data']> {
    const resultsPerPage = 100;
    const stravaActivities = [];
    let continueBatch = true;
    let page = 1;

    while (continueBatch) {
      const afterDate = after && `&after=${after}`;
      const beforeDate = before && `&before=${before}`;
      const requestUrl = `${this.appConfigService.baseUrl}/${this.appConfigService.apiPath}/athlete/activities?&access_token=${accesstoken}&per_page=${resultsPerPage}&page=${page}${afterDate}${beforeDate}`;

      try {
        const currentResult = await this.httpService.axiosRef.get(requestUrl);

        if (currentResult.data.length === 0) {
          continueBatch = false;
        } else {
          stravaActivities.push(...currentResult.data);
          page++;
        }
      } catch (error) {
        if (error.response.status === 401) {
          throw new UnauthorizedException('Invalid access token');
        }
        continueBatch = false;
      }
    }

    console.log('stravaActivities: ', stravaActivities);

    return stravaActivities.filter(
      (stravaActivity) => stravaActivity.type === ActivityType.RIDE,
    );
  }
}
