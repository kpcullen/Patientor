import { useState, SyntheticEvent } from 'react';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Input,
} from '@mui/material';

import {
  Diagnosis,
  EntryFormValues,
  EntryType,
  HealthCheckRating,
} from '../../types';

const entryTypeOptions: Record<EntryType, string> = {
  Hospital: 'Hospital Entry',
  OccupationalHealthcare: 'Occupational Healthcare Entry',
  HealthCheck: 'Health Check Entry',
};

const entryTypes = Object.keys(entryTypeOptions).map((key) => ({
  value: key as EntryType,
  label: entryTypeOptions[key as EntryType],
}));

const healthCheckRatingOptions = Object.entries(HealthCheckRating)
  .filter(([key]) => !isNaN(Number(key)))
  .map(([key, value]) => ({
    value: key,
    label: value,
  }));

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState<string>();
  const [specialist, setSpecialist] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCritera] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(1);

  const diagnosisCodeOptions = diagnoses.reduce(
    (acc: { value: string; label: string }[], obj) => {
      const newObj = {
        value: obj.code,
        label: obj.code,
      };
      acc.push(newObj);
      return acc;
    },
    []
  );

  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
  };

  const handleDiagnosisCodes = (e: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = e;

    setDiagnosisCodes(value as string[]);
  };

  const addEntry = (e: SyntheticEvent) => {
    e.preventDefault();

    const newBaseEntry = {
      date,
      specialist,
      diagnosisCodes,
      ...(description !== '' && { description }),
    };

    switch (type) {
      case 'Hospital': {
        const hospitalEntry = {
          ...newBaseEntry,
          type,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        } as EntryFormValues;

        onSubmit(hospitalEntry);
        break;
      }
      case 'HealthCheck': {
        const healthCheckEntry = {
          ...newBaseEntry,
          type,
          healthCheckRating,
        } as EntryFormValues;

        onSubmit(healthCheckEntry);
        break;
      }
      case 'OccupationalHealthcare': {
        const occupationalHealthcareEntry = {
          ...newBaseEntry,
          type,
          employerName,
          ...(sickLeaveStart &&
            sickLeaveEnd && {
              sickLeave: {
                startDate: sickLeaveStart,
                endDate: sickLeaveEnd,
              },
            }),
        } as EntryFormValues;
        onSubmit(occupationalHealthcareEntry);
        break;
      }
      default:
        throw new Error('Type unspecified...');
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel id="type">Type of visit</InputLabel>
        <Select
          required
          fullWidth
          labelId="type"
          id="type"
          value={type || ''}
          label="type"
          onChange={handleTypeChange}
        >
          {entryTypes.map((option) => (
            <MenuItem value={option.value} key={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <InputLabel id="date">Date of visit</InputLabel>
        <Input
          required
          fullWidth
          type="date"
          onChange={({ target }) => {
            setDate(target.value);
          }}
          value={date}
        />

        <InputLabel id="diagnosisCodes">Diagnosis Codes</InputLabel>
        <Select
          fullWidth
          multiple
          labelId="diagnosisCodes"
          id="diagnosisCodes"
          value={diagnosisCodes}
          label="diagnosisCodes"
          onChange={handleDiagnosisCodes}
        >
          {diagnosisCodeOptions.map((code) => (
            <MenuItem value={code.value} key={code.value}>
              {code.label}
            </MenuItem>
          ))}
        </Select>

        <InputLabel id="specialist">Name of specialist</InputLabel>
        <TextField
          required
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel id="specialist">Description of ailment</InputLabel>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        {type === 'Hospital' && (
          <>
            <InputLabel id="dischage">Discharge Date:</InputLabel>
            <Input
              type="date"
              fullWidth
              onChange={({ target }) => {
                setDischargeDate(target.value);
              }}
              value={dischargeDate}
            />
            <InputLabel id="dischage">Discharge Criteria:</InputLabel>
            <TextField
              label="Discharge Critera"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCritera(target.value)}
            />
          </>
        )}

        {type === 'OccupationalHealthcare' && (
          <>
            <InputLabel id="employerName">Employer's name</InputLabel>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel id="employerName">Sickleave Start Date:</InputLabel>
            <Input
              fullWidth
              type="date"
              onChange={({ target }) => {
                setSickLeaveStart(target.value);
              }}
              value={sickLeaveStart}
            />
            <InputLabel id="employerName">Sickleave End Date:</InputLabel>
            <Input
              fullWidth
              type="date"
              onChange={({ target }) => {
                setSickLeaveEnd(target.value);
              }}
              value={sickLeaveEnd}
            />
          </>
        )}

        {type === 'HealthCheck' && (
          <>
            <InputLabel id="healthCheckRating">Health Check Rating</InputLabel>
            <Select
              fullWidth
              required
              labelId="healthCheckRating"
              id="healthCheckRating"
              value={healthCheckRating}
              label="healthCheckRating"
              onChange={({ target }) => setHealthCheckRating(+target.value)}
            >
              {healthCheckRatingOptions.map((rating) => (
                <MenuItem key={rating.label} value={+rating.value}>
                  {rating.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        <Grid marginTop="10px">
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
