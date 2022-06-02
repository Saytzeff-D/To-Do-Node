const express = require('express');
const app = express();
const ejs = require('ejs')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const myRouter = require('./routes/route')
app.use("/", myRouter)

app.listen(9000, ()=>{
    console.log('My app is listening on port 9000')
})