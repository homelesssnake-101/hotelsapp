const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/reviewa");
const Listing = require("../models/listings");
const {reviewError} = require("../utils/listingError");
const {listingError,titleError,listingnotcomplete} = require("../utils/listingError");
const {isLoggedIn,isOwner} = require("../middlewares");
const wrapAsync = require("../utils/wrapAsync");


router.post("/", isLoggedIn, wrapAsync(async (req, res,next) => {

    const listing = await Listing.findById(req.params.id);
    listingError(listing,next);
    reviewError(req,next);
    const review = new Review(req.body.rev);
    review.user = req.user._id;
    await review.save();
    console.log(review);
    listing.reviews.push(review);
    await listing.save();
    req.flash("success","review added!");
    res.redirect(`/listings/${listing.title}`);
  }));
  router.delete("/:reviewId",isLoggedIn,isOwner, wrapAsync(async (req, res,next) => {
    const {id,reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    const listing = await Listing.findById(id);
    listingError(listing,next);
    console.log(listing);
    req.flash("success","review deleted!");
    res.redirect(`/listings/${listing.title}`);
  }));
module.exports = router;