const express = require("express");
const router = express.Router();
const Mail = require("../models/MailDB")

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => {
    res.redirect("/user/login");
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    try {
        let response = await Mail.find(
            { userID: req.user._id, isHome: true },
        ).sort({ _id: -1 }).lean();
        let userName;
        if (req.user.name) {
            userName = req.user.name;
        }
        else {
            userName = req.user.firstName;
        }
        res.render("dashboard", {
            name: userName,
            response
        });
        // if (!response) res.status(400).send('BAD REQUEST');
        // else res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).render("error/500");
    }
}
);
router.get("/create", ensureAuthenticated, (req, res) => {
    res.render("create");
});
module.exports = router;