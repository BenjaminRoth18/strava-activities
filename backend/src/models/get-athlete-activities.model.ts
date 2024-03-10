interface Activity {
  id: string;
  name: string;
  distance: number;
}

export interface GetAthleteActivitiesResponse {
  activities: Activity[];
}

export interface GetAthleteActivitiesQueryParams {
  after?: string;
  before?: string;
}

export const mapToActivity = (stravaActivity: any): Activity => {
  return {
    id: stravaActivity.id,
    name: stravaActivity.name,
    distance: +(stravaActivity.distance / 1000).toFixed(1), // convert meter to kilometer and fix to 1 decimal
  };
};

export enum ActivityType {
  RIDE = 'Ride',
}
