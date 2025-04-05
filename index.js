const express = require('express')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const mysql = require('mysql2/promise')
const path = require('path') // 38:40/46:58

//при наличии системной переменной используем ее, иначе ставим порт 3000
const PORT = process.env.PORT || 3000

//объект приложения
const app = express()

// 9:35/46:58
//настройки конфигураций будующего шаблонизатора
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

// 11:34/46:58
app.engine('hbs', hbs.engine)//движок рендеринга страницы
app.set('view engine', 'hbs')
app.set('views', 'views')//папка, где хранятся страницы сайта

// 35:10/46:58
app.use(express.urlencoded({ extended: true }))//чтобы считывать body в todo.js

// 38:12/46:58
app.use(express.static(path.join(__dirname, 'public')))//подключение css

app.use(todoRoutes)

async function start() {
  try {
    global.db = await mysql.createConnection({
      host: 'platon.teyhd.ru',
      user: 'student',
      password: 'studpass',
      database: 'makarov_todo',
      port: 3407
    })
    console.log('Успешное подключение к MySQL')

    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}...`)
    })
  } catch (e) {
    console.log('Ошибка подключения к MySQL:', e)
  }
}

start()

