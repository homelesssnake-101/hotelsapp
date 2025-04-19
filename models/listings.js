const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listings = require("../init/data");
const Review = require("./reviewa");
const {reviewSchema} = require("./reviewa");
const User = require("./user");
async function main() {
    await mongoose.connect("mongodb://localhost:27017/airbnb");
  }
  
  main().then(()=>{
      console.log("Connected to MongoDB");
  }).catch((err) => console.log(err));
  


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
});

listingSchema.post("findOneAndDelete", async function(listing){
    if(listing && listing.reviews && listing.reviews.length > 0){
        await Review.deleteMany({_id: {$in: listing.reviews}});
        console.log(`Deleted ${listing.reviews.length} reviews associated with listing: ${listing.title}`);
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
async function initDB(){
await Listing.deleteMany({});
/*await Listing.insertMany(listings.map(listing=>{
    return {
        ...listing, owner: "67ffeff870dfcc29931d6c3c"
    }
}));*/
console.log("Database initialized");
}
async function addReview(){
const hotel= await Listing.findOne({title: "Tokyo City Capsule" });
const rev = new Review({
    rating: 5,
    comment: "Great hotel, very clean and comfortable",
    user: "John Doe",
});
await rev.save();
hotel.reviews.push(rev);
await hotel.save();
}



// Uncomment this line to test the cascading deletion
// testDeleteListing();
