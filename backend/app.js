require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const Person = require('./models/person')

const app = express()


mongoose.set('strictQuery', false)

const url = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB at', new Date().toISOString())
  })
  .catch(error => console.error(`${new Date().toISOString()} - Error connecting to MongoDB: ${error.message}`))

app.use(express.json())
app.use(express.static('dist'))

app.use(
  morgan('tiny', {
    skip: (req) => req.method === 'POST'
  })
)

morgan.token('post-data', (req) => JSON.stringify(req.body))

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data',
    { skip: (req) => req.method !== 'POST' }
  )
)

const errorHandler = (error, req, res, next) => {
  console.error(`${new Date().toISOString()} - ${error.name} : ${error.message}`)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'wrong formatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: `${error.message}` })
  }

  next(error)
}

/* *********** METHODS *********** */
app.get('/api/persons', (req, res, next) => {
  Person
    .find({})
    .then(result => {
      if (result) {
        return res.json(result)
      } else {
        return res.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(result => {
      if (result) {
        return res.json(result)
      } else {
        return res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const data = req.body

  if (!data) {
    return res.status(400).json({
      error: 'incomplete request'
    })
  }

  const { name, number } = data
  const newPerson = new Person({ name, number })

  newPerson
    .save()
    .then(result => {
      if (result) {
        return res.json(result)
      } else {
        return res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => { res.status(204).end() })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const personToUpdate = { name, number }
  const options = { new: true, runValidators: true, context: 'query' }

  Person
    .findByIdAndUpdate(req.params.id, personToUpdate, options)
    .then(result => {
      if (result) {
        return res.json(result)
      } else {
        return res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  let peopleCount = 0

  Person
    .find({})
    .then(result => {
      if (result) {
        peopleCount = result.length
      }

      res.send(
        `<p>
        Phonebook has info for ${peopleCount} people
        </p>
        <p>
        ${new Date()}
        </p>
        `
      )
    })
    .catch(error => {
      console.error(error)
      res.send(
        `<p>
        Phonebook is disconnected
        </p>
        <p>
        ${new Date()}
        </p>
        `
      )
    })
})

app.get('/health', (req, res) => {
  res.send('ok')
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

module.exports = app