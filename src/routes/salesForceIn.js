const {Router} = require('express');

const router = Router();

router.post('/salesForceIn', async (req, res) => {
    try {
        console.log("Hola Perro")

        const payload = req.body.new
        console.log(payload.ContactId)
        res.json({
            success: true,
            message: 'connection create',
            data: payload.ContactId
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