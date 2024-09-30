import express from 'express';
import patientServices from '../services/patientServices';
import toNewPatient from '../../utils/patientUtils';
import toNewEntry from '../../utils/entryUtils';
import { NewEntry } from '../types';

const router = express();

router.get('/', (_req, res) => {
  res.send(patientServices.getNonSensitivePatientEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientServices.addPatient(newPatient);
    res.json(addedPatient);
  } catch (err) {
    let errorMessage = 'Something went wrong';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const patientInfo = patientServices.getPatient(id);

    res.send(patientInfo);
  } catch {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  try {
    const newEntry = toNewEntry(req.body as NewEntry);
    const addedEntry = patientServices.addEntry(newEntry, id);
    res.json(addedEntry);
  } catch (err) {
    let errorMessage = 'Something went wrong';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
