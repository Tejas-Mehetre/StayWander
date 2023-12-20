const express = require("express");
let router = express.Router();
let listing = require("../models/listing.js");
const methodOverride = require("method-override");
const listings = require("../routes/listing.js");
const flash = require("connect-flash/lib/flash.js");
const {isLoggedIn} = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");

router.use(methodOverride("_method"));

router
.route("/")
.get(listingcontroller.renderHome)        //root route
.post(listingcontroller.createListing);   //create route

//New route
router.get("/new",isLoggedIn , (req , res) => {
  res.render("new.ejs");
});

router.route("/:id")
.get(listingcontroller.renderShow)            //show route
.post(listingcontroller.editListing)          //edit route
.delete(listingcontroller.destroyListing);    // Delete Route

//Edit Route...
router.get("/:id/edit", isLoggedIn , listingcontroller.renderEdit);

module.exports = router;