import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useState } from "react";
import { convertDateToUnixTimestampInMs, getFromLocalStorage } from "../utils";
import { ActivityResponse } from "../models/backend.model";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const [afterDate, setAfterDate] = useState<Date | null>(new Date());
  const [beforeDate, setBeforeDate] = useState<Date | null>(new Date());
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const bearerToken = getFromLocalStorage("BearerToken");
  const hasDateRange = afterDate && beforeDate;
  const afterDateQueryParam =
    afterDate && `after=${convertDateToUnixTimestampInMs(afterDate)}`;
  const beforeDateQueryParam =
    beforeDate && `&before=${convertDateToUnixTimestampInMs(beforeDate)}`;

  const handleCalculateDistance = async () => {
    setIsLoading(true);
    setActivities(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const url = `${backendUrl}/athlete/activities${
      hasDateRange ? `?${afterDateQueryParam}${beforeDateQueryParam}` : ""
    }`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    try {
      const response = await fetch(url, options);

      console.log("response", response);

      if (response.status === 401) {
        // In case of unauthorized, remove the token from local storage and redirect to login to generate a new token
        localStorage.removeItem("BearerToken");
      }

      const jsonData = await response.json();
      setIsLoading(false);
      setActivities(jsonData.activities.map(mapToActivityList));
    } catch (error) {
      console.error("Error while fetching activities:", error);
    }
  };

  if (!bearerToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 12 }}>
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Calculate cycling distance
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <DatePicker
                maxDate={new Date()}
                value={afterDate}
                onChange={(newValue) => setAfterDate(newValue)}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                maxDate={new Date()}
                value={beforeDate}
                onChange={(newValue) => setBeforeDate(newValue)}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        <Grid
          container
          spacing={2}
          sx={{ mb: 2 }}
          alignItems="center"
          flexWrap="wrap"
        >
          <Grid item xs={3}>
            <Button onClick={handleCalculateDistance} variant="contained">
              Calculate
            </Button>
          </Grid>
          <Grid item xs={2}>
            {isLoading && <CircularProgress size={18} />}
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="sm">
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12}>
            {!activities ? null : activities.length > 0 ? (
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={3}>
                  <Typography variant="body1">
                    <strong>Total distance:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {calculateTotalDistance(activities)} km
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body1">
                <strong>No cycling activities found.</strong>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

const mapToActivityList = (stravaActivity: ActivityResponse): Activity => {
  return {
    id: stravaActivity.id,
    name: stravaActivity.name,
    distance: stravaActivity.distance,
  };
};

const calculateTotalDistance = (activities: Activity[]): number => {
  const totalDistance = activities
    .reduce((acc, activity) => acc + activity.distance, 0)
    .toFixed(1);

  return +totalDistance;
};

interface Activity {
  id: string;
  name: string;
  distance: number;
}
