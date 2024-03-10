const CalendarEvent = require('../models/CalendarEvent')

const getAllEvents = (req, res) => {
    res.send('Get all calendar events...')
}

const createEvent = async (req, res) => {
   try {
    const ce = await CalendarEvent.create(req.body)
    res.json(ce)    
   } catch (error) {
    res.status(500).json(error)
   }
}


const getEvent = (req, res) => {
    res.send('get a single calendar event...')
}

const updateEvent = (req, res) => {
    res.send('update a single calendar event...')
}

const deleteEvent = (req, res) => {
    res.send('delete a single calendar event')
}

module.exports = {
    getAllEvents,
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
}
