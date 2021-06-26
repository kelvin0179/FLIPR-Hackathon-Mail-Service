const express = require("express");
const router = express.Router();
const passport = require("passport");

//  auth/google
router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

//  auth/google/callback
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

router.get("/logout", (req, res) => {
    req.logOut();
    req.flash(
        "success_msg",
        "You have been successfully logged out"
    );
    res.redirect("/../user/login");
});

module.exports = router;