// require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const axios = require ('axios')
core = require('./src/lib/core')
const port = process.env.PORT || 8080
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


// // Make a request for a user with a given ID
// axios.get('https://api.rd.services/auth/dialog?client_id={client_id}&redirect_uri={redirect_uri}')
//     .then(function (response) {
//         // handle success
//         console.log(response);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .then(function () {
//         // always executed
//     });
//
