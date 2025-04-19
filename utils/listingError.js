const ExpressError = require("../Expresserror");
const {titleSchema} = require("../validateschema");
const {listingSchema} = require("../validateschema");
const {reviewSchema} = require("../validateschema");

let listingError=(listing,next)=>{  
    if(!listing) next(new ExpressError("Listing not found",500))
}




let titleError=(req,next)=>{
    let titleObj;
    // Check if the title is in params or body
    if (req.params.title) {
        titleObj = { title: req.params.title };
    } else if (req.body.title) {
        titleObj = { title: req.body.title };
    } else {
        titleObj = { title: '' };
    }
    
    const result = titleSchema.validate(titleObj);
    if(result.error){
        next(new ExpressError(result.error.details.map(e=>e.message).join(","),400));
    }
}

let reviewError=(req,next)=>{
    const result = reviewSchema.validate({rev: req.body.rev});
    if(result.error){
        next(new ExpressError(result.error.details.map(e=>e.message).join(","),400));
    }
}
let listingnotcomplete=(listing,next)=>{
    const result = listingSchema.validate(listing);
    if(result.error){
        next(new ExpressError(result.error.details.map(e=>e.message).join(","),400));
    }
}


module.exports={listingError,titleError,listingnotcomplete,reviewError};
