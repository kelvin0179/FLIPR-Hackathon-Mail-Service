const express = require('express');
const router = express.Router();
const Mail = require('../models/MailDB');
const { ensureAuthenticated } = require("../config/auth");

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

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        let response = await Mail.find(
            { userID: req.user._id, isHome: false },
        ).lean();
        res.render("history", { response });
    } catch (err) {
        res.status(500).render("error/500");
    }
});

router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        await Mail.remove({ _id: req.params.id });
        res.redirect("/api/history");
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

module.exports = router;