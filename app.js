const express = require("express");
let app = express();
let port = 8080;
const { MongoClient } = require('mongodb');
let mongoose = require("mongoose");
let listing = require("./models/listing.js");
const bodyParser = require("body-parser");
let path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingrouter = require("./routes/listing.js");
const reviewrouter = require("./routes/review.js");
const userrouter = require("./routes/user.js") ;
const session = require("express-session");
const flash = require("connect-flash");

let passport = require("passport");
let LocalStrategy = require("passport-local");
let user = require("./models/user.js");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname, "public")));

let sessionOptions = {
  secret : "mysupersecretstring" ,
  resave : false , 
  saveUninitialized : true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxage: 7 * 24 * 60 * 60 * 1000,
    httponly: true,
  }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curUser = req.user;
  next();
});

main()
    .then(()=>{
    console.log("Successfully connected to db");
})  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

//listen
app.listen(port , () =>{
    console.log("Successdully started the server");
});

//root route
app.get("/" , (req, res)=>{
    res.send("Server working");
});

app.get("/demouser" , async(req , res) => {
  let fakeuser = new user({
    email : "tejasmehetre7@gmail.com",
    username : "Tejas7",
  });

  let registeredUser = await user.register(fakeuser , "Tej@s1238");
  res.send(registeredUser);
});

app.use("/listing" , listingrouter);
app.use("/listing/:id/reviews" , reviewrouter);
app.use("/" , userrouter);

app.use(methodOverride("_method"));
