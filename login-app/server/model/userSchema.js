const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})
module.exports = mongoose.model("User", userSchema)