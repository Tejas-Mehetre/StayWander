const express = require("express");
let router = express.Router();
let listing = require("../models/listing.js");
const methodOverride = require("method-override");
const listings = require("../routes/listing.js");
const flash = require("connect-flash/lib/flash.js");
const {isLoggedIn} = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");

router.use(methodOverride("_method"));

router.get("" , listingcontroller.renderHome);

//New route
router.get("/new",isLoggedIn , (req , res) => {
  res.render("new.ejs");
});
  
  //Create Route
  router.post("", listingcontroller.createListing);
  
  //Show Route
  router.get("/:id", listingcontroller.renderShow);
  
  //Edit Route...
  router.get("/:id/edit", isLoggedIn , listingcontroller.renderEdit);
  
  router.post("/:id" , listingcontroller.editListing);

  //Delete Route
// Delete Route
router.delete("/:id", listingcontroller.destroyListing);

module.exports = router;