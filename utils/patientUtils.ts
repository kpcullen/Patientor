import { NewPatient, Gender } from '../src/types';
import { isDate, isString } from './generalUtils';

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect of missing name');
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Date of birth is missing or inccorect: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('SSN is missing or incorrect');
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Gender is missing or incorrect');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Occupation is missing or incorrect');
  }
  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Data is incorrect or fields are missing');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields missing');
};

export default toNewPatient;
