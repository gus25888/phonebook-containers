const { describe, test, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')

const Person = require('../models/person')
const app = require('../app')
const api = supertest(app)

let mongoServer

const endpointTested = '/api/persons'

const initialPersons = [
  {
    name: 'Perico Palotes',
    number: '123-456456',
  },
  {
    name: 'Zalo Gonzalez',
    number: '099-555482',
  },
]

const personsInDb = async () => {
  const persons = await Person.find({})
  return persons.map(p => p.toJSON())
}

describe('Persons', async () => {

  before(async () => {
    try {
      mongoServer = await MongoMemoryServer.create()
      const uri = mongoServer.getUri()

      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    } catch (error) {
      console.error('Error in generating DB - Details:')
      console.error(error)
      process.exit(1)
    }

  })

  beforeEach(async () => {
    await Person.deleteMany({})

    const personList = initialPersons.map(person => new Person(person))

    const promiseArray = personList.map(person => person.save())

    await Promise.all(promiseArray)
  })

  describe('persons - get', async () => {
    test('persons are returned as json', async () => {
      await api
        .get(endpointTested)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('persons quantity is correct', async () => {
      const response = await api.get(endpointTested)
      assert.strictEqual(response.body.length, initialPersons.length)
    })
  })

  describe('persons - post', async () => {
    test('a valid person can be added', async () => {
      const correctPerson = {
        name: 'Federico Errazuriz',
        number: '151-456448'
      }

      await api
        .post(endpointTested)
        .send(correctPerson)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const personsObtained = await personsInDb()
      assert.strictEqual(personsObtained.length, initialPersons.length + 1)

      const correctPersonFound = personsObtained.map(p => p.name)
      assert(correctPersonFound.includes(correctPerson.name))
    })

    test('a person with wrong data cannot be added', async () => {
      const wrongPerson = {
        name: 'Pepe Cortisona',
        number: '456448'
      }

      await api
        .post(endpointTested)
        .send(wrongPerson)
        .expect(400)

      const personsObtained = await personsInDb()
      assert.strictEqual(personsObtained.length, initialPersons.length)

      const personSearched = personsObtained.map(p => p.name)
      assert(!personSearched.includes(wrongPerson.name))
    })
  })


  after(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
  })
})

