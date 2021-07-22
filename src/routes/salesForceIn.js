const sFConnect = require('../controlers/sFConnect')
const jsforce = require('jsforce');
const {Router} = require('express');
const router = Router();

router.post('/salesForceIn', async (req, res) => {

    try {
        let contactEmail
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
                console.log(currentConnection.accessToken);
                console.log(currentConnection.instanceUrl);
                // logged in user property
                console.log("User ID: " + userInfo.id);
                console.log("Org ID: " + userInfo.organizationId);
                // ...
            });
        }
        const connection = async () => {
         if(!currentConnection) {
               await connectSF();
            }
          return currentConnection
        }
        connection().then( response => {
            console.log(response)
            connection.sobject("Contact")
                .find({Id: contactId}) // "fields" argument is omitted
                .execute(function (err, records) {
                    if (err) {
                        return console.error(err);
                    }
                    contactEmail = records
                    console.log(records);
                });
            console.log(contactEmail)
        })
        // await sFConnect.connection().then( conn => {
        //     conn
        //
        // })
        //define the ContactId to find in salesForce
        const payload = req.body.new
        console.log(payload[0])
        const contactId = payload[0].ContactId
        //Connect to SalesForce (login)


        // Find contact by Id on SalesForce

        // Conectar con RD

        // usar contact.Email para actualizar contacto por email en RD
        // await axios.patch('https://api.rd.services/platform/contacts/email:contactEmail.Email', {
        //   cf_etapa: payload[0].StageName
        //  }).then((resp) => {
        //      console.log(resp)
        //  }).catch((error) => {
        //      console.error(error)
        //  })


//
        res.json({
            success: true,
            message: 'connection create',
            data: payload
        })
    } catch (error) {
        res.status(400)
        res.json({
            success: false,
            message: error.message
        })
    }
})
module.exports = router;