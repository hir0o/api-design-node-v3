import express, { Router } from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

router.get('/get', (req, res) => {
  res.send({ message: 'hello' })
})

app.use('/api', router)

const log = (req, res, next) => {
  console.log('logging')
  next()
}

app.get('/data:id', [log, log, log], (req, res) => {
  res.send({ message: 'hello' })
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
