import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { AthleteService } from '../services/athlete.service';
import {
  GetAthleteActivitiesQueryParams,
  GetAthleteActivitiesResponse,
  mapToActivity,
} from '../models/get-athlete-activities.model';
import { getBearerTokenFromHeaders } from 'src/utils';
import e from 'express';

@Controller('athlete')
export class AthleteController {
  constructor(private readonly athleteService: AthleteService) {}

  @Get('/activities')
  async getAthleteCyclingActivities(
    @Query() queryParams: GetAthleteActivitiesQueryParams,
    @Req() request: Request,
  ): Promise<GetAthleteActivitiesResponse> {
    const { after, before } = queryParams;
    const accessToken = getBearerTokenFromHeaders(request);

    try {
      const response = await this.athleteService.getCyclingActivitiesByAthlete(
        accessToken,
        after,
        before,
      );

      return {
        activities: response.map(mapToActivity),
      };
    } catch (error) {
      throw error;
    }
  }
}
