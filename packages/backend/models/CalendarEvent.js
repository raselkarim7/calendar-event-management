const mongoose = require('mongoose')

const CalendarEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
})

module.exports = mongoose.model('CalendarEvent', CalendarEventSchema)
