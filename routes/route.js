const express = require('express')
const router = express.Router()
const myController = require('../controllers/controller')

router.get('/todo', myController.getTodo)
router.post('/addTask', myController.addTask)
router.post('/delTodo', myController.delTodo)
router.post('/editTodo', myController.editTodo)

module.exports = router