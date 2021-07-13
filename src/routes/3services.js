// const {Router} = require('express');
// const sendEmail = require('../controlers/sendEmail')
// const convertion = require('../lib/convertion')
// const router = Router();
//
// router.post('/email', async (req, res) => {
//     try {
//         console.log(req.body.emailData)
//         const submissionData = req.body.dataUser
//         const input = req.body.emailData
//         const data = await convertion.Convertion.create(submissionData)
//         const payload = await  sendEmail.send3ServicesEmail(input)
//         res.json({
//             success: true,
//             message: 'convertion create',
//             data: payload
//         })
//     } catch (error) {
//         res.status(400)
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }
// })
// module.exports = router;