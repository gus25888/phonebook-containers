const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Name required'],
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'Phone number required'],
    validate: {
      validator: (value) => /^\d{2,3}-\d{5,}$/.test(value),
      message: (props) => `Phone number '${props.value}' is not valid. It must be 'xx-xxxxx' or 'xxx-xxxxx'`
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)