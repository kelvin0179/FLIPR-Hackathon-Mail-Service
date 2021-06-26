const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcryptjs");

//bringing schema from models
const User = require("../models/User");

router.get("/login", (req, res) => {
    res.render("login", { layout: "login" });
});

router.get("/register", (req, res) => {
    res.render("register", { layout: "login" });
});

router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    //checking required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill the required fields" });
    }
    //confirming password
    if (password2 !== password) {
        errors.push({ msg: "Passwords do not match" });
    }
    if (password.length < 6) {
        errors.push({ msg: "Password should be at least greater than 6 characters" });
    }

    //checking for the error count
    if (errors.length > 0) {
        console.log(errors);
        res.render("register", {
            //ES6
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else {
        // validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // already exists
                    errors.push({ msg: "Email already exists" })
                    console.log(errors);
                    res.render("register", {
                        //ES6
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else {
                    // new user
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    console.log(newUser);
                    //hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // hashing password
                            newUser.password = hash;
                            //save user
                            newUser.save()
                                .then(user => {
                                    req.flash(
                                        "success_msg",
                                        "You have Registered , Now you can login"
                                    );
                                    res.redirect("/user/login");
                                })
                                .catch(err => console.log(err));
                        })
                    })
                }
            });
    }
});

//login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/user/login",
        failureFlash: true
    })(req, res, next);
});

//logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash(
        "success_msg",
        "You have been successfully logged out"
    );
    // res.redirect("/users/login");
    res.redirect("/user/login");
});

module.exports = router;