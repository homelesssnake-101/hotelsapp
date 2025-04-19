const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    
        title: Joi.string().required().pattern(/^[a-zA-Z\s]+$/),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().pattern(/^[a-zA-Z\s]+$/),
        country: Joi.string().required().pattern(/^[a-zA-Z\s]+$/),
        image: Joi.object({
            url: Joi.string().required(),
            filename: Joi.string().required(),
        }).required(),
        reviews: Joi.array().optional().allow("",null),
        lat: Joi.number().optional().allow("",null),
        lon: Joi.number().optional().allow("",null),
        category: Joi.string().required().valid("seashores", "mountains", "forests", "buildings", "domes", "landmarks", "cities", "poolhouse", "farms", "castles", "luxury", "houses", "boats"),
    
}).required();
module.exports.titleSchema = Joi.object({
    title: Joi.string().required().pattern(/^[a-zA-Z\s]+$/)
})
module.exports.reviewSchema = Joi.object({
    rev: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
        
    }).required()
}).required();
