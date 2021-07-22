const sFConnect = require('../controlers/sFConnect')
const {Router} = require('express');
const router = Router();

router.post('/salesForceIn', async (req, res) => {
    try {
        let contactEmail
        //define the ContactId to find in salesForce
        const payload = req.body.new
        console.log(payload[0])
        const contactId = payload[0].ContactId
        //Connect to SalesForce (login)
        // Find contact by Id on SalesForce
       await sFConnect.connection().then(conn => {
          conn.sobject("Contact")
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