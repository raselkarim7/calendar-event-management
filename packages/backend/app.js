const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const connectDB = require('./db/connect')

const calenderEventsRoutes = require('./routes/calendar-events')

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')



const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Load env vars
dotenv.config({ path: ".env" });

// routes
app.use('/api/v1', calenderEventsRoutes)

// middleware 
app.use(notFound)
app.use(errorHandlerMiddleware)

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
