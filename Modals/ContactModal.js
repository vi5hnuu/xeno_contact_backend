const mongoose = require('mongoose');
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'contact name is required...'],
    trim: true
  },
  contact: {
    type: String,
    required: [true, 'contact no is required is required...'],
    validate: [validator.isMobilePhone, 'Please enter a valid mobile number.']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, { timestamps: true })

module.exports.model = mongoose.model('Contact', ContactSchema, 'contacts')