const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

    let toysSchema = mongoose.Schema(
    {
        name: {
        type:String,
        required:true,
        minLength:2,
        maxLength:99
        },
        info: {
        type:String,
        required:true,
        minLength:2,
        maxLength:999
        },
        category: {
        type:String,
        required:true,
        minLength:2,
        maxLength:99
        },
        img_url: {
        type:String,
        required:true,
        minLength:2,
        maxLength:200
        },
        price: {
        type:Number,
        required:true,
        maxLength:99
        },
        date:{type:Date,default:Date.now()}
    })
  
    exports.toysModel = mongoose.model("toys",toysSchema);
    
    const validToy = (_toy) =>
    {
            let JoiSchema = Joi.object(
            {
                id:Joi.string(),
                name:Joi.string().min(2).max(99).required(),
                info:Joi.string().min(2).max(999).required(),
                category:Joi.string().min(2).max(99).required(),
                img_url:Joi.string().min(2).max(300).required(),
                price:Joi.number().max(99999999).required(),
            })
    
        return JoiSchema.validate(_toy);
    }
    
    exports.validToy = validToy;