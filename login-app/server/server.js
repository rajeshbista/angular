const express = require("express");
const app = express()
const mongoose = require("mongoose")
const fs = require("fs")
const cors = require("cors")
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

mongoose.connect("mongodb+srv://dbRajesh:root@cluster0.qg40u.mongodb.net/angular-practice?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useCreateIndex:true
})
.then(()=>console.log("connected to db!"))
.catch(err=>console.log("Error"))
app.use(jsonParser)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

fs.readdirSync("./routes").map(fname=>app.use(require("./routes/"+fname)))

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}!`)
})