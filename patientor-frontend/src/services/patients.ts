import axios from 'axios'
import { Entry, EntryFormValues, Patient, PatientFormValues } from '../types'

const apiBaseUrl = '/api/patients'

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}`)

  return data
}

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/${id}`)
  return data
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}`, object)
  return data
}

const addEntry = async (object: EntryFormValues, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/${id}/entries`,
    object
  )
  console.log(data)
  return data
}

export default {
  getAll,
  create,
  getPatient,
  addEntry,
}
