// require('dotenv').config()

const express = require('express')
app = express()
cors = require('cors')
rdConnect = require('./src/controlers/rdConnection')
connectSF = require('./src/controlers/sFConnect')
core = require('./src/lib/core')
 port = process.env.PORT || 8080
app.use(cors({origin: '*'}))
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//Routes
app.use(require('./src/routes/salesForceIn'))

const prueba = async () => {
    try {
        await core.db.authenticate();
        console.log(`Connection to DB  in ${process.env.NODE_ENV} mode has been established successfully`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Start Server

app.listen(port, () => {
    console.log(`Server is power ⚡ on localhost:${port}`)
    prueba().catch((error) => {
        console.error(error)
    })
})

//Connect to Rd
const logger = async () => {
    try {
        await rdConnect.getToken()
        // await connectSF.connection()
    } catch (error) {
        console.error(error)
    }
}

logger().then(() => {
    console.log('services connected')
}).catch((error) => {
    console.error(error)
})
