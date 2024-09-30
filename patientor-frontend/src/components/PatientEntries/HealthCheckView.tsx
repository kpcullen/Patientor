import { Box } from '@mui/material';
import { HealthCheckEntry, HealthCheckRating } from '../../types';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

interface Props {
  entry: HealthCheckEntry;
}

const healthRatingIcons = {
  [HealthCheckRating.Healthy]: '💚',
  [HealthCheckRating.LowRisk]: '💛',
  [HealthCheckRating.HighRisk]: '💔',
  [HealthCheckRating.CriticalRisk]: '☠️',
};

const getHealthRatingIcon = (rating: HealthCheckRating): string => {
  return healthRatingIcons[rating];
};

const HealthCheckView = ({ entry }: Props) => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
      <h3>
        {entry.date} <MonitorHeartIcon />
      </h3>
      {getHealthRatingIcon(entry.healthCheckRating)}
      <div>Specialist: {entry.specialist}</div>
      <div>Description: {entry.description}</div>
    </Box>
  );
};

export default HealthCheckView;
