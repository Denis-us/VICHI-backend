const {Schema, model} = require('mongoose')

const photosSchema = new Schema ({
    image: {
      type: String,
      required: [true, 'Set name for photo'],
    },
    alt: {
      type: String,
    },
  }, {versionKey: false})

  const Photos = model('photos', photosSchema)
  
  module.exports = Photos