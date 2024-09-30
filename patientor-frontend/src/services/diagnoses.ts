import axios from 'axios'

const apiBaseUrl = '/api/diagnoses'

const getAll = async () => {
  const { data } = await axios.get(`${apiBaseUrl}`)
  return data
}

export default { getAll }
