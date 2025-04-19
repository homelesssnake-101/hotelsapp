const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

reviewSchema.post("findOneAndDelete", async function(review) {
    if(review) {
        await mongoose.model("Listing").updateOne(
            { reviews: { $in: [review._id] } },
            { $pull: { reviews: review._id } }
        );
    }
});

// Add middleware for findByIdAndDelete
reviewSchema.post("findByIdAndDelete", async function(review) {
    if(review) {
        await mongoose.model("Listing").updateOne(
            { reviews: { $in: [review._id] } },
            { $pull: { reviews: review._id } }
        );
    }
});

module.exports = mongoose.model("Review", reviewSchema);
module.exports.reviewSchema = reviewSchema;
