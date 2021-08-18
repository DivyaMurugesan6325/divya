const joi = require('joi');
const schema = {
    user: joi.object({
        username : joi.string().required(),
        email : joi.string().email().required(),
        password : joi.string().required(),
    }),



    login : joi.object({
        email : joi.string().email().required(),
        password : joi.string().required(),
    
    }),
    deletee : joi.object({
       id : joi.string().required()
    })
    
}
module.exports = schema;