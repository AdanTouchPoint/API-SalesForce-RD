#! /usr/local/bin/node
const user = require('./src/models/user')
const smokersubmission = require('./src/models/smokersubmission')
const submissionfalse = require('./src/models/submissionfalse')
const electoral_division = require('./src/models/electoral_division')
const postcodes = require('./src/models/postcodes')
const userfortwit = require('./src/models/userfortwit')
const tweet = require ('./src/models/tweet')
const convertion_3services = require ('./src/models/convertion_3services')


const syncAll = async () => {
    await user.sync();
    await smokersubmission.sync();
    await submissionfalse.sync();
    await electoral_division.sync();
    await postcodes.sync();
    await userfortwit.sync();
    await tweet.sync();
    await convertion_3services.sync()
};

syncAll()
    .catch(error => console.error(error))
    .then(() => console.log('All tables synced'));
