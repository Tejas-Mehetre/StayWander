const express = require("express");
let app = express();
let path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

const sessionOptions = {
    secret : "mysupersecretstring" ,
    resave : false , 
    saveUninitialized : true
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/reqcount" , (req , res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count = 1;
    }
    res.send(`You sent a request ${req.session.count} times`);
});

app.get("/register" , (req , res)=>{
    const {name = "Anonymous"} = req.query;
    req.session.name = name;
    req.flash("success" , " registered Successfully");
    req.flash("error" , " Error Ocurred");
    res.redirect("/hello");
});

app.get("/hello" , (req , res)=>{
    res.render("page.ejs" , {"name" : req.session.name , sucmsg : req.flash("success") , errmsg : req.flash("error")});
})

app.listen(3000 , () =>{
    console.log("Server is listening");
});