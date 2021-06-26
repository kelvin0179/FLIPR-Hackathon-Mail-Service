const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const notifier = require('../controllers/notifier.js');
const Mail = require('../models/MailDB');


/**
 * @route   POST /api/notify/
 * @desc    schedule a new job
 * @access  Public
 */

router.post('/', async (req, res) => {
    try {
        // to-do : schedule string to manipulate job
        const maildata = new Mail({
            user: "dummyuser", // change: to req.user.username
            userMail: req.body.from, // change: to req.user.MailID
            recipient: req.body.email,
            mailSubject: req.body.subject,
            mailBody: req.body.text
        });
        let saved = await maildata.save();
        // will handle db error here 
        cron.schedule('*/15 * * * * *', async () => {
            await notifier.sendEmail(
                req.body.from, // change it to req.user.MailID
                req.body.email, // recipient
                req.body.subject,
                req.body.text,
                (err, result) => {
                    if (err) {
                        console.error({ err });
                    }
                    else res.send('done');
                });
        });
    } catch (e) {
        console.log('an error occured: ' + JSON.stringify(e, null, 2));
        throw e;
    }
});


module.exports = router;