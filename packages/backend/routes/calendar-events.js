const express = require('express')
const router = express.Router()

const { getAllEvents, createEvent, getEvent, updateEvent, deleteEvent } = require('../controller/calendar-events')

router.route('/calendar-events').get(getAllEvents).post(createEvent)

router.route('/calendar-events/:id').get(getEvent).patch(updateEvent).delete(deleteEvent)

module.exports = router