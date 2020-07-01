const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: String,
  url: String,
  date: String,
  tags: [],
  comment: [],
  breadcrumb: String,
  status: String,
  type: String,
}).set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Post', postSchema)