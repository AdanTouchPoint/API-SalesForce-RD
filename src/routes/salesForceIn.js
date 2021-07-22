const jsforce = require('jsforce');
const {Router} = require('express');
rdConnect = require('../controlers/rdConnection')
axios = require('axios');
const router = Router();

router.post('/salesForceIn', async (req, res) => {
    try {
        //define the ContactId to find in salesForce
        let token
        let conn
        let contactEmail
        const payload = req.body.new
        console.log(payload[0])
        const contactId = payload[0].ContactId
        //Connect to SalesForce (login)
        conn = await new jsforce.Connection({
            // you can change loginUrl to connect to sandbox or prerelease env.
            // loginUrl : 'https://test.salesforce.com'
        });
        await conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, function (err, userInfo) {
            if (err) {
                return console.error(err);
            }
            // Now you can get the access token and instance URL information.
            // Save them to establish connection next time.
            console.log("Connect salesForce Done!")
            console.log(conn.accessToken);
            console.log(conn.instanceUrl);
            // logged in user property
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);
            // ...
        });
        // Find contact by Id on SalesForce
        await conn.sobject("Contact")
            .find({Id: contactId}) // "fields" argument is omitted
            .execute(function (err, records) {
                if (err) {
                    return console.error(err);
                }
                contactEmail = records

            });
        const mail = contactEmail[0].Email
        console.log(mail)

        rdConnect.getToken()
            .then((resp) => {
                console.log(resp)
            }).catch(() => {
            rdConnect.refreshToken()
                .then((resp) => {
                    console.log('Here')
                    console.log(resp.data.access_token)
                }).catch((error) => {
                console.error(error)
            })
        })


        // usar contact.Email para actualizar contacto por email en RD
        // await axios.patch(`https://api.rd.services/platform/contacts/email:${mail}`, {
        //   cf_etapa: payload[0].StageName
        //  },{
        //         headers: {
        //             'Authorization': `${token}`
        //         }
        //  }).then((resp) => {
        //      console.log(resp)
        //  }).catch((error) => {
        //      console.error(error)
        //  })
//
        res.json({
            success: true,
            message: 'connection create',
            data: contactId
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