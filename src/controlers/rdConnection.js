const axios = require('axios');

const  getToken = async() => {
    let resp =  axios.post('https://api.rd.services/auth/token', {
        "client_id": process.env.CLIENT_ID,
        "client_secret": process.env.CLIENT_SECRET,
        "code": process.env.CODE
    })
    return resp
}

const refreshToken = () => {
   let resp = axios.post('https://api.rd.services/auth/token', {
        "client_id": process.env.CLIENT_ID,
        "client_secret": process.env.CLIENT_SECRET,
        "refresh_token": process.env.REFRESH_TOKEN
    })
    return resp
}
module.exports = {getToken, refreshToken}