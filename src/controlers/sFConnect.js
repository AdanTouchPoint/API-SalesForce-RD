const jsforce = require('jsforce');

let currentConnection
const  connectSF = () => {
     currentConnection =  new jsforce.Connection({
        // you can change loginUrl to connect to sandbox or prerelease env.
        // loginUrl : 'https://test.salesforce.com'
    });
    currentConnection.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        console.log("Connect salesForce Done!")
        console.log(connect.accessToken);
        console.log(connect.instanceUrl);
        // logged in user property
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);
        // ...
    });
 }

const connection = async () => {
    if(!currentConnection) {
        connectSF();
    }
    return currentConnection
}

module.exports = {connection}