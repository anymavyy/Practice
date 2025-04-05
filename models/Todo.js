class Todo {
completed = 0 //при создании новой задачи, она будет невыполненной

//Получение всех записей из таблицы БД
static async findAll() { //асинхронная функция для работы с базой данных
  const [rows] = await db.query('SELECT id, title, complete AS completed FROM todos')
  return rows
}

  static async create(title) {
    await db.query('INSERT INTO todos (title, complete) VALUES (?, ?)', [title, 0])
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM todos WHERE id = ?', [id])
    return rows.length ? rows[0] : null
  }

  static async updateCompleted(id, completed) {
    const value = completed ? 1 : 0
    completed = value
    await db.query('UPDATE todos SET complete = ? WHERE id = ?', [value, id])
  }
}

module.exports = Todo
