const mongoose = require("mongoose");

const CalendarEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must provide title"],
    trim: true,
    maxlength: [50, "Title can not be more than 50 characters"],
  },
  startDate: {
    type: Date,
    required: [true, "Must provide start date"],
  },
  isRepeat: {
    type: Boolean,
    required: [true, "Must provide is repeat"],
  },
  repeatAfter: {
    type: Number,
    min: [0, "Must be at least 0, got {VALUE}"],
    required: [
      function () {
        return this.get("isRepeat"); // have to write more validation code here. 
      },
      "Must have repeat after days",
    ],
    // 1 - Daily
    // 7 - Weekly
    // 14 - Bi weekly
    // 30 - Monthly
    // 365 - Yearly
  },
  isFullday: {
    type: Boolean,
    required: [false, "Must provide is full day"],
  },

  startTime: {
    type: Date, 
    required: [
      function () {
        return !this.get("isFullday");
      },
      "Must have start time",
    ],
  },
  endTime: {
    type: Date, 
    required: [
      function () {
        return !this.get("isFullday");
      },
      "Must have end time",
    ],
  },
  description: {
    type: String,
    maxlength: [150, "Description can not be more than 150 characters"],
  },
  note: {
    type: String,
    maxlength: [350, "Note can not be more than 350 characters"],
  },
  endDate: {
    type: Date,
  },
});

module.exports = mongoose.model("CalendarEvent", CalendarEventSchema);
