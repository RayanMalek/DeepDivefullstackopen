require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/person')

if (process.argv.length === 4) {
  const name = process.argv[2]
  const number = process.argv[3]

  new Person({ name, number }).save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 2) {
  Person.find({}).then(result => {
    result.forEach(p => console.log(p))
    mongoose.connection.close()
  })
} else {
  console.log('usage: node mongo.js                    (list all)')
  console.log('       node mongo.js "Name" "Number"    (add one)')
  process.exit(1)
}
