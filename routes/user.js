const express = require("express");
let router = express.Router();
let user = require("../models/user");
const flash = require("connect-flash/lib/flash");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");


router.get("/signup" , (req , res) => {
    res.render("user/signup.ejs");
});

router.post("/signup" , );

router.get("/login" , (req , res) => {
    res.render("user/login.ejs");
})

router.post("/login" ,
    saveRedirectUrl,
    passport.authenticate("local" , 
    {failureRedirect : "/login",
    failureFlash : true}),
    );

router.get("/logout", );

module.exports = router;