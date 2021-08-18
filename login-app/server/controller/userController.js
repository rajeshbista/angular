const Users = require("../model/userSchema")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');

// get All users
exports.getAllUsers = async(req, res)=>{
    const data = await Users.find({}).exec()
    res.json(data)
}

// login validation
exports.validateLogin = async(req, res)=>{

    const {loginmail, loginpass} = req.body
    const foundUser = await Users.findOne({email:loginmail})
    if(foundUser){
        bcrypt.compare(loginpass, foundUser.password, function(err, result){
            if(err){
               return ("password error", err)
            }
            if(result){
                const token = jwt.sign({
                    name: foundUser.name,
                    loginmail:foundUser.email
                }, "secretKeyOption", 
                {
                    expiresIn:"1h"
                })
                
             return (res.json({message:"Found User", token:token, name:foundUser.name}))
            }
        })

    }else{
        return res.json(false)
    }
}


// sign up
exports.registerUser = async(req, res)=>{
    // console.log(req.body, "I am req.body")
    const {name, address, phone, email, password} = req.body

        const foundUser = await Users.findOne({email:email})

        if(!foundUser){
            bcrypt.hash(password, 10, function(err, hash){
                const savedDataToDb = new Users({
                    name:name,
                    address:address,
                    phone:phone,
                    email:email,
                    password:hash
                })
                savedDataToDb.save()
                .then(()=>res.json(savedDataToDb))
                .catch(err=>console.log("Error", err))
            })
        }
        else{
            res.json("duplicate email!!")
        }
}