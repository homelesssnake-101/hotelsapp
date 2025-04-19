const Listing = require("./models/listings");
const Review = require("./models/reviewa");

const isLoggedIn = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    console.log(req.session.returnTo);
    if (req.method !== "GET") {
      if (req.method === "POST") {
        const listing = await Listing.findById(req.params.id);

        req.session.returnTo = `/listings/${listing.title}`;
        console.log(req.session.returnTo);
      } else {
        req.session.returnTo = `/listings/${req.params.title}`;
        console.log(req.session.returnTo);
      }
    }
    req.flash("error", "You must be logged in to do that");
    return res.redirect("/login");
  }
  next();
};
const storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.url = req.session.returnTo;
    delete req.session.returnTo;
  }
  next();
};
const isOwner = async (req, res, next) => {
  const { title } = req.params;
  if (typeof title !== "undefined") {
    const listing = await Listing.findOne({ title: title });
    if (!listing.owner.equals(req.user._id)) {
      req.flash("error", "You are not the owner of this listing");
      return res.redirect(`/listings/${listing.title}`);
    }
    next();
  } else {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.user.equals(req.user._id)) {
      req.flash("error", "You are not the owner of this review");
      return res.redirect(`/listings/${review.listing.title}`);
    }
    next();
  }
};

const geocode = async (req, res, next) => {
    try {
      const { location, country } = req.body;
      const address = encodeURIComponent(`${location},${country}`);
      const apiKey = process.env.GEOAPIFY_API_KEY;
      const geoRes = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${apiKey}`
      );
      const data = await geoRes.json();
      if (!data.features?.length) {
        req.flash("error", "No location found for this address");
        req.body.lat = null;
        req.body.lon = null;
        return next();
      }
      const { lat, lon } = data.features[0].properties;
      req.body.lat = lat;
      req.body.lon = lon;
      next();
    } catch (err) {
      next(err);
    }
  };
module.exports = { isLoggedIn, storeReturnTo, isOwner, geocode };
