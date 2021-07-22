const axios = require('axios');

const  getToken = async() => {
    axios.post('https://api.rd.services/auth/token', {
        "client_id": process.env.CLIENT_ID,
        "client_secret": process.env.CLIENT_SECRET,
        "code": process.env.CODE
    }).then((resp) => {
        console.log(resp.data)
        process.env.ACCESS_TOKEN = resp.data.access_token
    }).catch((error) => {
        refreshToken()

    })
}

const refreshToken = () => {
    axios.post('https://api.rd.services/auth/token', {
        "client_id": process.env.CLIENT_ID,
        "client_secret": process.env.CLIENT_SECRET,
        "refresh_token": process.env.REFRESH_TOKEN
    }).then((resp) => {
        //console.log(resp.data)

    }).catch((error) => {
        console.error(error)
    })
}
module.exports = {getToken, refreshToken}