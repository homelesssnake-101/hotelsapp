const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listings");
const { isLoggedIn, isOwner, geocode } = require("../middlewares");

const wrapAsync = require("../utils/wrapAsync");
const {
  listingError,
  titleError,
  listingnotcomplete,
} = require("../utils/listingError");
const flash = require("connect-flash");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const listings = await Listing.find({});
    listingError(listings, next);

    res.render("listings/index.ejs", { listings });
  })
);

router.get(
  "/add",
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    res.render("listings/add.ejs");
  })
);

router.get(
  "/category/:category",
  wrapAsync(async (req, res, next) => {
    const category = req.params.category;
    const listingscategory = await Listing.find({ category: category });

    if (listingscategory.length === 0) {
      req.flash("error", "No listings found!");
      res.redirect("/listings");
    } else {
      res.render("listings/index.ejs", {
        listings: listingscategory,
        category: category,
      });
    }
  })
);

router.get(
  "/search",
  wrapAsync(async (req, res, next) => {
    const search = req.query.search;
    const titlematches = await Listing.find({
      title: { $regex: search, $options: "i" },
    });
    const locationmatches = await Listing.find({
      location: { $regex: search, $options: "i" },
    });
    const countrymatches = await Listing.find({
      country: { $regex: search, $options: "i" },
    });
    const categorymatches = await Listing.find({
      category: { $regex: search, $options: "i" },
    });
    const listingssearch = [
      ...titlematches,
      ...locationmatches,
      ...countrymatches,
      ...categorymatches,
    ];
    listingssearch.sort((a, b) => b._id.toString().localeCompare(a._id.toString()));
    const listingssearchfiltered = listingssearch.filter((a, index, self) => {
      if (index == self.length - 1) {
        return true;
      } else {
        if (self[index]._id.toString() === self[index + 1]._id.toString()) {
          return false;
        } else {
          return true;
        }
      }
    });

    if (listingssearchfiltered.length === 0) {
      req.flash("error", "No listings found!");
      res.redirect("/listings");
    } else {
      res.render("listings/index.ejs", {
        listings: listingssearchfiltered,
        search: search,
      });
    }
  })
);

router.post(
  "/add",
  upload.single("image"),
  geocode,
  wrapAsync(async (req, res, next) => {
    const listing = new Listing(req.body);
    listingError(listing, next);
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    listing.lat = req.body.lat;
    listing.lon = req.body.lon;
    console.log(listing);

    listing.owner = req.user._id;
    const listingObject = {
      title: listing.title,
      description: listing.description,
      price: listing.price,
      location: listing.location,
      country: listing.country,
      image: {
        url: listing.image.url,
        filename: listing.image.filename,
      },
      lat: listing.lat,
      lon: listing.lon,
      category: listing.category,
    };

    listingnotcomplete(listingObject, next);

    await listing.save();
    req.flash("success", "Listing created successfully!");
    res.redirect("/listings");
  })
);

router.get(
  "/:title",
  wrapAsync(async (req, res, next) => {
    titleError(req, next);
    const title = req.params.title;

    const listing = await Listing.findOne({ title: title })
      .populate({ path: "reviews", populate: { path: "user" } })
      .populate("owner");
    if (!listing) {
      req.flash("error", "listing does not exist!");
      res.redirect("/listings");
    }

    listingError(listing, next);

    res.render("listings/show.ejs", {
      listing: listing,
      geoapifyKey: process.env.GEOAPIFY_API_KEY,
    });
  })
);
router.delete(
  "/:title/delete",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res, next) => {
    titleError(req, next);
    const listing = await Listing.findOneAndDelete({ title: req.params.title });
    if (!listing) {
      req.flash("error", "listing does not exist!");
      res.redirect("/listings");
    }
    req.flash("success", "listing deleted!");

    console.log("deleted");
    console.log(listing);
    res.redirect("/listings");
  })
);

router.get("/:title/edit", async (req, res, next) => {
  titleError(req, next);
  try {
    const listing = await Listing.findOne({ title: req.params.title });
    listingError(listing, next);
    res.render("listings/edit.ejs", { listing: listing });
  } catch (e) {
    next(e);
  }
});
router.put(
  "/:title/edit",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  geocode,
  wrapAsync(async (req, res, next) => {
    const listing = await Listing.findOne({ title: req.params.title });
    listingError(listing, next);

    listing.title = req.body.title;
    listing.description = req.body.description;
    listing.price = req.body.price;
    listing.location = req.body.location;
    listing.country = req.body.country;
    listing.lat = req.body.lat;
    listing.lon = req.body.lon;
    if (req.file) {
      listing.image.url = req.file.path;
      listing.image.filename = req.file.filename;
    }
    // Converting to plain object for validation
    const listingObject = {
      title: listing.title,
      description: listing.description,
      price: listing.price,
      location: listing.location,
      country: listing.country,
      image: {
        url: listing.image.url,
        filename: listing.image.filename,
      },
      lat: listing.lat,
      lon: listing.lon,
      category: listing.category,
    };

    listingnotcomplete(listingObject, next);
    await listing.save();
    req.flash("success", "listing edited!");
    res.redirect(`/listings/${listing.title}`);
  })
);
module.exports = router;
