const mongoose = require('mongoose')

const CalendarEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Must provide title'],
    trim: true,
    maxlength: [50, 'Title can not be more than 50 characters'],
  },
  startDate: {
    type: Date,
    required: [true, 'Must provide start date']
  },
  repeatAfter: {
    type: Number,
    min: [1, 'Must be at least 1, got {VALUE}'],
    // 1 - Daily
    // 7 - Weekly
    // 14 - Bi weekly
    // 30 - Monthly
    // 365 - Yearly
  },
  isFullday: {
    type: Boolean,
    required: [false, 'Must provide is full day']
  },

  startTime: {
    type: String, // Example: 18:00:00 // https://stackoverflow.com/a/56537756
    required: [ function () {
      console.log('startTime thisssssssssssssssssssssssssssssssssssssssssssssssssssssss: ', this)
      return !this.isFullday
    }, 'Must have start time']
  }, 
  endTime: {
    type: String, // Example: 18:00:00 // https://stackoverflow.com/a/56537756
    required: [(function () {
      console.log('endTime thisssssssssssssssssssssssssssssssssssssssssssssssssssssssss: ', this)
      return !this.isFullday
    }), 'Must have end time'],
  }, 
  description: {
    type: String,
    maxlength: [250, 'Description can not be more than 250 characters'],
  },
  note: {
    type: String,
    maxlength: [350, 'Note can not be more than 350 characters'],
  },
  endDate: {
    type: Date,
  },


})

module.exports = mongoose.model('CalendarEvent', CalendarEventSchema)
