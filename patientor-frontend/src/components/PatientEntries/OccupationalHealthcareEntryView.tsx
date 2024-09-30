import { Box } from '@mui/material';
import { OccupationalHealthcareEntry } from '../../types';
import HealingIcon from '@mui/icons-material/Healing';

interface Props {
  entry: OccupationalHealthcareEntry;
  getDescription: (arg: string) => string;
}

const OccupationHealthcareEntryView = ({ entry, getDescription }: Props) => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
      <h3>
        {entry.date} <HealingIcon />
      </h3>
      <div>Specialist: {entry.specialist}</div>
      <div>Employer name: {entry.employerName}</div>
      <div>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                Diagnosis: {code}: {getDescription(code)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        Description:<em> {entry.description}</em>
      </div>
      {entry.sickLeave && (
        <div>
          Sick Leave:{' '}
          {`From ${entry.sickLeave?.startDate} to ${entry.sickLeave?.endDate}`}
        </div>
      )}
    </Box>
  );
};

export default OccupationHealthcareEntryView;
