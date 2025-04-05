const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()


// 28:13/46:58
router.get('/', async (req, res) => { //асинхронная функция, тк делается запрос к БД
  const todos = await Todo.findAll() //получение всех существующих ToDo

  res.render('index', { // 23:38/46:58
    title: 'Todos list', //название страницы
    isIndex: true, //флаг страницы
    todos //передаем массив как параметр в нашу страницу
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true
  })
})

// 34:12/46:58
router.post('/create', async (req, res) => {
  await Todo.create(req.body.title)
  res.redirect('/')
})

// 41:12/46:58
router.post('/complete', async (req, res) => { //обработка завершения ToDo
  const todo = await Todo.findById(req.body.id)//нахождение нужного ToDo

  await Todo.updateCompleted(req.body.id, !!req.body.completed) // обновляем поле complete в БД
  todo.completed = req.body.completed // обновляем поле completed у найденной задачи
  res.redirect('/') //перенаправляем пользователя обратно на главную страницу
})

module.exports = router
