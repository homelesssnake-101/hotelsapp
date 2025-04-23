const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./reviewa");
const {reviewSchema} = require("./reviewa");
const User = require("./user");



const listingSchema = new Schema({
    title: String,
    description: String,
    image: {
        url: String,
        filename: String,
        
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    lat: Number,
    lon: Number,
    category: {
        type: String,
        enum: ["seashores", "mountains", "forests", "buildings", "domes", "landmarks", "cities", "poolhouse", "farms", "castles", "luxury", "houses", "boats"],
    }
});

listingSchema.post("findOneAndDelete", async function(listing){
    if(listing && listing.reviews && listing.reviews.length > 0){
        await Review.deleteMany({_id: {$in: listing.reviews}});
        console.log(`Deleted ${listing.reviews.length} reviews associated with listing: ${listing.title}`);
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;




