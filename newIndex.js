const express = require('express');
const app = express();
const ejs = require('ejs')
const bodyParser = require("body-parser");
const { redirect } = require('express/lib/response');
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const mongoose = require("mongoose")
const URI = "mongodb+srv://Saytzeff-D:lolly15@cluster0.afjdjoq.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(URI, (err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log('Mongoose connected successfully')
    }
})


let userSchema = mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    pword:String
})

let userModel = mongoose.model('users', userSchema)

let todoArr = []
let allStudents = []
let editInd = ''
let editObj = {}
let todoStyle = {style: 'btn btn-danger', innerText: 'Add'}
let editIndex = true

app.get('/',(req, res)=>{
    res.render("index", {name: 'Ade', allStudents});
    // res.send('Hello World')
    // res.sendFile(__dirname+"/index.html")
})

app.get('/signup', (req, res)=>{
    res.render('signup')
})
app.post('/signup', ((req, res)=>{
    const userDetails = req.body
    let form = new userModel(userDetails)
    form.save((err)=>{
        if (err) {
            console.log('Cant sign up')
        } else {
            res.redirect("/")
        }
    })
    // allStudents.push(req.body)
    // res.render('index',{name: 'Ade',allStudents})
}))
app.post('/delete', ((req, res)=>{
    let i = req.body.index
    let filterArr = allStudents.filter((each, ind)=>(ind != i))
    allStudents = filterArr
    res.redirect('/')
}))
app.post('/edit', ((req, res)=>{
    editInd = req.body.index
    editObj = allStudents[req.body.index]
    // console.log(editObj)
    res.render('edit', {editObj})
}))
app.post('/saveChanges', ((req, res)=>{
    allStudents[editInd] = req.body
    res.redirect('/')
}))
app.get('/todo', ((req, res)=>{
    res.render('to-do', {todoArr, todoStyle, editIndex})
}))
app.post('/addTask', (req, res)=>{
    todoArr.push(req.body)
    res.redirect('/todo')
})
app.post('/delTodo', (req, res)=>{
    todoArr = todoArr.filter((each, i)=>(i != req.body.index))
    res.redirect('/todo')
})
app.post('/editTodo', (req, res)=>{
    editIndex = req.body.ind
    todoStyle.style = 'btn btn-success'
    todoStyle.innerText = 'Save'
    res.redirect('/todo', {editIndex})
})
app.listen(9000, ()=>{
    console.log('My app is listening on port 9000')
})