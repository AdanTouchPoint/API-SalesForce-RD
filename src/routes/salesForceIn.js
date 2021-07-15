const {Router} = require('express');
const jsforce = require('jsforce');
const router = Router();

router.post('/salesForceIn', async (req, res) => {
    try {
        console.log("Hola Perro")
        //definir el ContactId a buscar en salesForce
        const payload = req.body.new
        console.log(payload[0].ContactId)
        const contactId = payload[0].ContactId
        //Conectar con SalesForce (loggin)
        const conn = await new jsforce.Connection({
            // you can change loginUrl to connect to sandbox or prerelease env.
            // loginUrl : 'https://test.salesforce.com'
        });
      await conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD+process.env.SF_TOKEN, function(err, userInfo) {
            if (err) { return console.error(err); }
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

        // buscar Contacto en salesForce por ID
    const contactEmail = await conn.sobject("Contact")
            .find({ Id:contactId}) // "fields" argument is omitted
            .execute(function(err, records) {
                if (err) { return console.error(err); }
                console.log(records);
            });
    await console.log(contactEmail)
        // Conectar con RD

        // usar contact.Email para actualizar contacto por email en RD

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