import {
  Diagnosis,
  Discharge,
  EntryType,
  HealthCheckRating,
  NewEntry,
} from '../src/types';
import { isDate, isNumber, isString } from './generalUtils';

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Date is missing or incorrect ' + date);
  }
  return date;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Description is missing or incorrect ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Specialist is missing or incorrect ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((rating) => rating)
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Health Check Rating is invalid');
  }
  return healthCheckRating;
};

const parseCriteria = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Discharge criteria invalid');
  }
  return text;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  return (
    typeof discharge === 'object' &&
    discharge !== null &&
    'date' in discharge &&
    'criteria' in discharge
  );
};

const parseEmployerName = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Employer name is invalid');
  }
  return text;
};

const isType = (text: unknown): text is EntryType => {
  return (Object.values(EntryType) as string[]).includes(text as EntryType);
};

const parseType = (text: unknown): string => {
  if (!isType(text)) {
    throw new Error('Invalid entry type');
  }
  return text;
};

const toNewEntry = (object: NewEntry): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Data is incorrect or fields are missing');
  }

  if (
    'date' in object &&
    'description' in object &&
    'specialist' in object &&
    'type' in object
  ) {
    const baseNewEntry = {
      date: parseDate(object.date),
      description: parseDescription(object.description),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      type: parseType(object.type),
    };

    switch (object.type) {
      case 'Hospital': {
        if (!('discharge' in object) || !isDischarge(object.discharge)) {
          throw new Error('Discharge info missing');
        }
        return {
          ...baseNewEntry,
          discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseCriteria(object.discharge.criteria),
          },
        } as NewEntry;
      }
      case 'OccupationalHealthcare': {
        if (!('employerName' in object)) {
          throw new Error('Missing employer name');
        }
        return {
          ...baseNewEntry,
          employerName: parseEmployerName(object.employerName),
          ...(object?.sickLeave?.startDate &&
            object?.sickLeave?.endDate && {
              sickLeave: {
                startDate: parseDate(object.sickLeave.startDate),
                endDate: parseDate(object.sickLeave.endDate),
              },
            }),
        } as NewEntry;
      }
      case 'HealthCheck': {
        if (!('healthCheckRating' in object)) {
          throw new Error('Health check rating is missing');
        }
        return {
          ...baseNewEntry,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        } as NewEntry;
      }
    }
  }
  throw new Error('Incorrect data: some fields missing');
};

export default toNewEntry;
