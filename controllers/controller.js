let todoArr = []
let todoStyle = {style: 'btn btn-danger', innerText: 'Add'}
let editIndex = ''
let editValue = ''

const getTodo =(req, res)=>{
    res.render('to-do', {todoArr, todoStyle, editValue})
}
const addTask =(req, res)=>{
    if (todoStyle.innerText == 'Add') {
        todoArr.push(req.body)
        res.redirect('/todo')
    } else {
        todoArr[parseInt(editIndex)].todo = editValue
        console.log(todoArr)
        editValue = ''
        todoStyle.style = 'btn btn-danger'
        todoStyle.innerText = 'Add'
        res.redirect('/todo')
    }
}
const delTodo =(req, res)=>{
    todoArr = todoArr.filter((each, i)=>(i != req.body.index))
    res.redirect('/todo')
}
const editTodo =(req, res)=>{
    editIndex = req.body.myIndex
    editValue = todoArr[parseInt(editIndex)].todo
    todoStyle.style = 'btn btn-success'
    todoStyle.innerText = 'Save'
    res.redirect('/todo')
}

const myController = {getTodo, addTask, delTodo, editTodo}
module.exports = myController