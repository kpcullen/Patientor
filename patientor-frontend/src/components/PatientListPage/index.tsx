import { useState } from 'react'
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  Alert,
} from '@mui/material'
import axios from 'axios'

import { PatientFormValues, Patient } from '../../types'
import HealthRatingBar from '../HealthRatingBar'

import patientService from '../../services/patients'
import { Link } from 'react-router-dom'
import ModalWindow from '../ModalWindow/ModalWindow'
import AddPatientForm from '../AddPatientModal/AddPatientForm'

interface Props {
  patients: Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values)
      setPatients([...patients, patient])
      setModalOpen(false)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          )
          console.error(message)
          setError(message)
        } else {
          setError('Unrecognized axios error')
        }
      } else {
        console.error('Unknown error', e)
        setError('Unknown error')
      }
    }
  }

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: '1em' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                {' '}
                <Link to={`/${patient.id}`}>{patient.name} </Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalWindow
        modalOpen={modalOpen}
        onClose={() => closeModal()}
        visit={false}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <AddPatientForm onCancel={closeModal} onSubmit={submitNewPatient} />
      </ModalWindow>
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  )
}

export default PatientListPage
