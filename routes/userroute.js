const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {isLoggedIn,storeReturnTo} = require("../middlewares");
const Listing = require("../models/listings");


router.get("/signup",(req,res)=>{
    res.render("users/signup");
})
router.post("/signup",wrapAsync(async(req,res)=>{
    try {
        const {username,email,password} = req.body.user;
        const user = new User({username,email});
        const registeredUser = await User.register(user,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to the website "+registeredUser.username);
            res.redirect("/listings");
        })
        

    } catch (error) {
        req.flash("error",error.message);
        res.redirect("/signup");
    }
}))
router.get("/login",(req,res)=>{
    res.render("users/login");
})
router.post("/login",storeReturnTo,passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),(req,res,next)=>{
    req.flash("success","Welcome back "+req.user.username);
    console.log(res.locals.url);
    const redirectUrl = res.locals.url || "/listings";
    
    res.redirect(redirectUrl);
})
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/listings");
    });
})


module.exports = router;
