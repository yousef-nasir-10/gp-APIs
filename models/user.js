const mongoose = require('mongoose')
const jwt  = require('jsonwebtoken')
const Joi = require("joi")
const userSchema = new mongoose.Schema({
    id: {type:String, required: true, unique: true},
    email: {type:String, required: true, unique: true},
    role: {type: String, default: "student" },
    // id: {type:String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    password: {type:String, required: true, },
    otp: {type:String}
})



User = mongoose.model('Users', userSchema)

const validate = data => {
    const schema = Joi.object({
        firstName: Joi.string().required.label("firstName"),
        LastName: Joi.string().required.label("LastName"),
        email: Joi.string().required.label("Email"),
        password: passwordComplexity().required.label("Password"),
        
        
    })

    return schema.validate(data)
}

module.exports ={User, validate}