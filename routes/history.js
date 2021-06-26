const express = require('express');
const router = express.Router();
const Mail = require('../models/MailDB');


// work in progress


// router.get('/ishome', async (req, res) => {
//     try {
//         let response = await Mail.find(
//             { userID: req.user._id, isHome: true },
//         );
//         if (!response) res.status(400).send('BAD REQUEST');
//         else res.status(200).json(response);
//     } catch (err) {
//         res.status(500).type("txt").send("SERVER ERROR");
//     }
// });

router.get('/', async (req, res) => {
    try {
        let response = await Mail.find(
            { userID: req.user._id, isHome: false },
        ).lean();
        res.render("history", { response });
    } catch (err) {
        res.status(500).type("txt").render("error/500");
    }
});

module.exports = router;