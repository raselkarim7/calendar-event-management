const dotenv = require('dotenv')
const express = require('express')
const connectDB = require('./db/connect')

const app = express()

//Load env vars
dotenv.config({ path: ".env" });

// routes
const calenderEventsRoutes = require('./routes/calendar-events')
app.use('/api/v1', calenderEventsRoutes)

// middleware 
const notFound = require('./middleware/not-found')
app.use(notFound)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server listening on port ${port}....`)
        })
    } catch (error) {
        console.log('Error occured while DB connect.', error)
    }
}

start()
