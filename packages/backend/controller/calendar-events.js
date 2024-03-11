const { createCustomError } = require('../errors/custom-error')
const CalendarEvent = require('../models/CalendarEvent')

const getAllEvents = async (req, res) => {
    const all = await CalendarEvent.find({})
    res.status(200).json(all)
}

const createEvent = async (req, res) => {
    try {
        const ce = await CalendarEvent.create(req.body)
        res.json(ce)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getEvent = async (req, res, next) => {
    const { id: eventID } = req.params
    try {
        const result = await CalendarEvent.findOne({_id: eventID})
        res.status(200).json(result)        
    } catch (error) {
        return next(createCustomError(`No calendar event with id : ${eventID}`, 404))
    }
}

const updateEvent = async (req, res, next) => {
    const { id: eventID } = req.params
    // console.log('update event: ', req.body)
    let foundResult = {}

    try {
        foundResult = await CalendarEvent.findOne({_id: eventID})
    } catch (error) {
        return next(createCustomError(`No calendar event with id : ${eventID}`, 404))
    }
    
    try {
        const result = await CalendarEvent.findOneAndUpdate({_id: eventID}, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json(result)        
    } catch (error) {
        return res.json(error)
        
    }
}

const deleteEvent = async (req, res, next) => {
    const { id: eventID } = req.params
    try {
        const result = await CalendarEvent.findOneAndDelete({_id: eventID})
        res.status(200).json(result)        
    } catch (error) {
        return next(createCustomError(`No calendar event with id : ${eventID}`, 404))
    }
}

module.exports = {
    getAllEvents,
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
}
