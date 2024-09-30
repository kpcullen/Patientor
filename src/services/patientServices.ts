import patients from '../../data/patients';
import { NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  console.log(patient);
  return patient;
};

const addEntry = (entry: NewEntry, id: string) => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  console.log(newEntry);

  const patient = patients.find((patient) => patient.id === id);

  if (!patient) {
    throw new Error('Patient not found');
  }
  if (!patient.entries) {
    patient.entries = [newEntry];
  }
  patient.entries = [...patient.entries, newEntry];
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
  getPatient,
  addEntry,
};
