import express from 'express'
import cors from 'cors'
import diagnosisRouter from './routes/diagnoses'
import patientRouter from './routes/patients'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
)
app.use(express.static('dist'))

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/diagnoses', diagnosisRouter)
app.use('/api/patients', patientRouter)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
