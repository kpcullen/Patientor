import { Box } from '@mui/material';
import { HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntry;
  getDescription: (arg: string) => string;
}

const HospitalEntryView = ({ entry, getDescription }: Props) => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
      <h3>
        {entry.date} <LocalHospitalIcon />
      </h3>
      <div>Specialist: {entry.specialist}</div>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code}: {getDescription(code)}
            </li>
          ))}
        </ul>
      )}
      <div>
        Description:<em> {entry.description}</em>
      </div>
      <div>
        Dischage: {`By ${entry.discharge.date} if ${entry.discharge.criteria}`}
      </div>
    </Box>
  );
};

export default HospitalEntryView;
