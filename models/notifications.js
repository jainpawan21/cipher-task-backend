 
const mongoose = require('mongoose')


const notificationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  url : {
    type: String,
    trim: true
  },
} ,{
  timestamps: true
}) 

const Notification = mongoose.model('notification', notificationSchema)

module.exports = Notification