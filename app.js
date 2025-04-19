const express = require("express");
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const app = express();
const ExpressError = require("./Expresserror");
const wrapAsync = require("./utils/wrapAsync");
const engine = require('ejs-mate');

const multer = require("multer");
const {storage} = require("./cloudConfig");
const upload = multer({ storage });
const  expressSession = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/userroute");
app.engine('ejs', engine);




const listingRoutes = require("./routes/listings");


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
const mongoose = require("mongoose");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));


const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },

};
app.use(expressSession(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






async function main() {
  await mongoose.connect("mongodb://localhost:27017/airbnb");
}

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err) => console.log(err));

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user =req.user;
  res.locals.geoapifyKey = process.env.GEOAPIFY_API_KEY;
 
  
  next();
})

app.use("/listings",listingRoutes);

app.use("/listings/:id/reviews",reviewRoutes);

app.use("/",userRoutes);

app.use((req,res,next)=>{
  const err = new ExpressError("Page Not Found",404);
  next(err);
})
app.use((err,req,res,next)=>{
  const {statusCode = 500,message = "Oh No, Something Went Wrong!"} = err;
  console.log(statusCode);
 
  
  res.status(statusCode).render("listings/error.ejs",{message:message});
})
