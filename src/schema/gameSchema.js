import joi from "joi";

export const postGameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal:joi.number().min(1).required(),
    pricePerDay:joi.number().min(1).required(),

})